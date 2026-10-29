# LoginComponent: от пользовательского ввода до обновления представления

Чтобы разобраться в устройстве Angular-компонента, рассмотрим конкретный пример из нашего приложения Personal Finance — форму входа пользователя.

На странице будет белая панель с заголовком `Login`, полями `Login name` и `Password`, а также кнопками `OK` и `Cancel`. Компонент хранит введённые значения, проверяет их с помощью регулярных выражений и отображает сообщения об ошибках.

Компонент размещается в библиотеке `Pages`: это UI конкретного приложения Personal Finance, а не универсальный компонент библиотеки `Shared`. Повторное использование само по себе не означает, что компонент должен находиться в Shared. Архитектурное размещение определяется его назначением и границами ответственности.

## 1. Структура компонента

Реализация разделена на три файла:

- `login.component.ts` — состояние компонента, проверки и обработчики событий;
- `login.component.html` — HTML-шаблон и привязки Angular;
- `login.component.scss` — стили компонента в SCSS.

### 1.1. login.component.ts

```typescript
import { Component, EventEmitter, Output } from '@angular/core';

interface LoginCredentials {
  email: string;
  password: string;
}

@Component({
  selector: 'app-login',
  standalone: true,
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  @Output() loginRequested = new EventEmitter<LoginCredentials>();

  email = '';
  password = '';
  emailError = '';
  passwordError = '';

  private readonly emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  private readonly passwordRegex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z0-9\s]).{12,}$/;

  validateEmail(): void {
    if (!this.email) {
      this.emailError = 'Login name is required.';
    } else if (!this.emailRegex.test(this.email)) {
      this.emailError = 'Enter a valid email address.';
    } else {
      this.emailError = '';
    }
  }

  validatePassword(): void {
    if (!this.password) {
      this.passwordError = 'Password is required.';
    } else if (!this.passwordRegex.test(this.password)) {
      this.passwordError = 'Password does not meet the requirements.';
    } else {
      this.passwordError = '';
    }
  }

  onEmailInput(value: string): void {
    this.email = value;
    this.validateEmail();
  }

  onPasswordInput(value: string): void {
    this.password = value;
    this.validatePassword();
  }

  onSubmit(event: SubmitEvent): void {
    event.preventDefault();
    this.validateEmail();
    this.validatePassword();

    if (this.emailError || this.passwordError) {
      return;
    }

    this.loginRequested.emit({
      email: this.email,
      password: this.password,
    });
  }

  onCancel(): void {
    this.email = '';
    this.password = '';
    this.emailError = '';
    this.passwordError = '';
  }
}
```

Состояние представлено обычными свойствами класса. Методы проверки отделены от обработчиков ввода: обработчик сохраняет новое значение и запускает соответствующую проверку. При успешной локальной проверке компонент генерирует событие `loginRequested`, чтобы родительский компонент мог продолжить сценарий входа.

Компонент не выполняет аутентификацию и не подтверждает личность пользователя. Реальная проверка учётных данных выполняется серверной частью приложения.

### 1.2. login.component.html

```html
<div class="login-container">
  <section class="login-panel">
    <h1>Login</h1>

    <form (submit)="onSubmit($event)" novalidate>
      <div class="form-field">
        <label for="login-name">Login name</label>
        <input
          id="login-name"
          type="email"
          autocomplete="username"
          [value]="email"
          (input)="onEmailInput($any($event.target).value)"
          [attr.aria-invalid]="!!emailError"
          aria-describedby="email-error"
        />
        @if (emailError) {
          <p id="email-error" class="error" role="alert">
            {{ emailError }}
          </p>
        }
      </div>

      <div class="form-field">
        <label for="password">Password</label>
        <input
          id="password"
          type="password"
          autocomplete="current-password"
          [value]="password"
          (input)="onPasswordInput($any($event.target).value)"
          [attr.aria-invalid]="!!passwordError"
          aria-describedby="password-error"
        />
        @if (passwordError) {
          <p id="password-error" class="error" role="alert">
            {{ passwordError }}
          </p>
        }
      </div>

      <div class="actions">
        <button type="submit">OK</button>
        <button type="button" class="cancel" (click)="onCancel()">
          Cancel
        </button>
      </div>
    </form>
  </section>
</div>
```

Здесь `[value]` передаёт значение свойства в поле, `(input)` вызывает обработчик при изменении значения, `@if` условно отображает сообщение, а интерполяция `{{ ... }}` выводит текст. Атрибут `novalidate` отключает встроенную браузерную валидацию, чтобы в этом примере мы могли сосредоточиться на логике компонента.

Подробнее о привязке событий: [Angular — Adding event listeners](https://angular.dev/guide/templates/event-listeners).

### 1.3. login.component.scss

В проекте используется SCSS с Compass. SCSS помогает структурировать стили с помощью переменных, вложенных правил и миксинов и создаёт основу для дальнейшей работы с дизайн-токенами. Браузер непосредственно SCSS не обрабатывает: он компилируется в CSS. Подробно архитектуру стилей и Compass рассмотрим отдельно.

```scss
:host {
  display: block;
  font-family: Arial, sans-serif;
  color: #222;
}

.login-container {
  display: flex;
  justify-content: center;
  padding: 32px 16px;
}

.login-panel {
  box-sizing: border-box;
  width: 100%;
  max-width: 320px;
  padding: 24px;
  background: #fff;
  border: 1px solid #ddd;
  border-radius: 4px;

  h1 {
    margin: 0 0 24px;
    font-size: 22px;
    font-weight: 500;
  }
}

.form-field {
  margin-bottom: 18px;

  label {
    display: block;
    margin-bottom: 6px;
    font-size: 14px;
  }

  input {
    box-sizing: border-box;
    width: 100%;
    padding: 9px;
    border: 1px solid #aaa;
    border-radius: 3px;
    font-size: 14px;

    &:focus {
      outline: 2px solid #9bbcf5;
      outline-offset: 1px;
    }

    &[aria-invalid='true'] {
      border-color: #c62828;
    }
  }
}

.error {
  margin: 5px 0 0;
  color: #c62828;
  font-size: 12px;
}

.actions {
  display: flex;
  justify-content: flex-end;
  gap: 8px;
  margin-top: 24px;

  button {
    min-width: 72px;
    padding: 8px 14px;
    border: 1px solid #aaa;
    border-radius: 3px;
    background: #f5f5f5;
    color: #222;
    cursor: pointer;

    &:hover {
      background: #e9e9e9;
    }

    &:focus-visible {
      outline: 2px solid #2563eb;
      outline-offset: 2px;
    }

    &.cancel {
      background: #fff;
    }
  }
}
```

Вложенные правила позволяют связывать стили с соответствующими элементами интерфейса. На этом этапе мы не вводим переменные, миксины и дизайн-токены: сначала разбираемся с компонентом, а систему стилей рассмотрим отдельно. Compass — дополнительный инструмент; сам по себе SCSS не требует Compass, поэтому конкретные возможности инструмента должны соответствовать конфигурации проекта.

## 2. Что делает компонент

Компонент отображает форму, хранит введённые значения, проверяет их формат, показывает ошибки и генерирует событие при успешной локальной проверке.

Регулярное выражение для email отсекает некоторые очевидно некорректные значения, но не гарантирует существование адреса. В примере пароль должен содержать не менее 12 символов, заглавную и строчную латинские буквы, цифру и специальный символ. Это демонстрационные правила, а не универсальная политика безопасности. Клиентскую проверку можно обойти, поэтому backend обязан самостоятельно проверять учётные данные.

## 3. Change Detection: как Angular обновляет представление

Change Detection — механизм Angular, который определяет, какие части представления необходимо проверить и обновить после изменения состояния приложения.

Например, пользователь вводит символ в поле email. Браузер генерирует событие `input`, Angular вызывает обработчик, компонент обновляет свойство `email` и запускает проверку. Если изменилось сообщение об ошибке, Angular обновляет соответствующую часть представления.

Последовательность выглядит так:

1. Пользователь изменяет значение поля.
2. Браузер генерирует событие `input`.
3. Angular вызывает зарегистрированный обработчик.
4. Обработчик обновляет состояние и выполняет проверку значения.
5. Angular синхронизирует представление с состоянием приложения.
6. Пользователь видит актуальное значение и сообщение об ошибке, если оно необходимо.

В этом примере нам не нужно вручную изменять DOM или запускать проверку представления. Мы изменяем состояние в обработчиках, зарегистрированных через шаблон Angular.

Исторически Angular широко использовал Zone.js, чтобы отслеживать асинхронные операции и определять моменты, когда может потребоваться проверка. В современных версиях доступен и zoneless-подход, позволяющий обходиться без Zone.js. Это не отменяет Change Detection, а меняет механизм, с помощью которого Angular узнаёт о необходимости обновления.

Официальная документация: [Angular — Zoneless](https://angular.dev/guide/zoneless).

## 4. Почему мы используем событие input

Привязка `(input)` реагирует на изменение значения поля, а не только на нажатие клавиши. Значение можно изменить, например, вставкой текста через контекстное меню. Поэтому событие `input` лучше соответствует задаче проверки текущего значения поля.

Сам обработчик `input` — обычная привязка к событию браузера, которую Angular обрабатывает в контексте своего шаблона. Это не отдельный механизм Change Detection.

## 5. Директивы: повторное использование поведения

В текущем варианте `LoginComponent` сам проверяет email. Для одной формы это допустимо, но если поле с теми же правилами появится в регистрации или настройках профиля, проверку придётся повторять. Атрибутная директива позволяет привязать поведение к элементу HTML и повторно использовать его в разных шаблонах.

Важен не только факт проверки, но и контракт между директивой и компонентом. Директива должна сообщить результат проверки, а компонент — решить, как отобразить обратную связь пользователю. В нашем примере директива не меняет DOM и не управляет сообщениями об ошибках: она проверяет значение и выдаёт результат через `@Output()`.

### 5.1. Контракт результата проверки

Сначала определим небольшой тип результата. Он сообщает, корректно ли значение и какой текст ошибки следует показать. Пустое сообщение означает, что ошибка сейчас не должна отображаться.

```typescript
export interface FieldValidationResult {
  valid: boolean;
  message: string;
}
```

### 5.2. EmailValidatorDirective

Создадим standalone-директиву `EmailValidatorDirective`. Селектор `[appEmailValidator]` означает, что директива подключается как атрибут к существующему элементу, а не создаёт собственный HTML-элемент.

```typescript
import { Directive, ElementRef, EventEmitter, HostListener, Output } from '@angular/core';
import { FieldValidationResult } from './field-validation-result';

@Directive({
  selector: '[appEmailValidator]',
  standalone: true,
})
export class EmailValidatorDirective {
  @Output() emailValidationChange =
    new EventEmitter<FieldValidationResult>();

  private readonly emailRegex = /^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$/;
  private touched = false;

  constructor(private readonly elementRef: ElementRef<HTMLInputElement>) {}

  @HostListener('input')
  onInput(): void {
    this.validate(this.touched);
  }

  @HostListener('blur')
  onBlur(): void {
    this.touched = true;
    this.validate(true);
  }

  private validate(showRequiredError: boolean): void {
    const value = this.elementRef.nativeElement.value.trim();

    let result: FieldValidationResult;

    if (!value) {
      result = {
        valid: false,
        message: showRequiredError ? 'Login name is required.' : '',
      };
    } else if (!this.emailRegex.test(value)) {
      result = {
        valid: false,
        message: 'Enter a valid email address.',
      };
    } else {
      result = { valid: true, message: '' };
    }

    this.emailValidationChange.emit(result);
  }
}
```

Директива слушает два события DOM:

- `input` — проверяет значение по мере ввода. Пока пользователь ещё не покинул пустое поле, обязательность поля не подсвечивается; после первого ухода из поля пустое значение уже сопровождается сообщением.
- `blur` — отмечает поле как затронутое и проверяет его. Это позволяет не показывать ошибку обязательного поля сразу при открытии формы.

Для чтения значения здесь используется `ElementRef`, но директива не записывает в элемент стили, классы или текст ошибки. Её задача — проверить значение и отправить результат через `emailValidationChange`. В более сложной форме можно предпочесть встроенную систему Angular Forms и интерфейс `Validator`; здесь мы сохраняем простой контракт событий, соответствующий текущему примеру.

Регулярное выражение — только базовая проверка формата, а не доказательство существования адреса. Сервер всё равно должен самостоятельно проверять данные, необходимые для входа.

### 5.3. Подключаем директиву к LoginComponent

Standalone-директива должна быть импортирована в компонент, чей шаблон её использует. Добавим её в `imports` метаданных `LoginComponent`:

```typescript
import { Component, EventEmitter, Output } from '@angular/core';
import { EmailValidatorDirective } from './email-validator.directive';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [EmailValidatorDirective],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  @Output() loginRequested = new EventEmitter<LoginCredentials>();

  email = '';
  password = '';
  emailError = '';
  passwordError = '';

  onEmailInput(value: string): void {
    this.email = value;
  }

  onEmailValidationChange(result: FieldValidationResult): void {
    this.emailError = result.message;
  }
}
```

Это фрагмент изменений, а не полный файл компонента: остальные свойства и обработчики формы остаются на месте. Из `LoginComponent` нужно удалить прежние `emailRegex` и `validateEmail()`, поскольку теперь правило проверки принадлежит директиве. Компонент получает готовый результат и сохраняет текст ошибки для отображения.

В шаблоне заменим привязку email-поля на следующую:

```html
<input
  id="login-name"
  type="email"
  autocomplete="username"
  [value]="email"
  appEmailValidator
  (input)="onEmailInput($any($event.target).value)"
  (emailValidationChange)="onEmailValidationChange($event)"
  [attr.aria-invalid]="!!emailError"
  aria-describedby="email-error"
/>
@if (emailError) {
  <p id="email-error" class="error" role="alert">
    {{ emailError }}
  </p>
}
```

Здесь есть два независимых потока:

1. `input` обновляет значение `email` в компоненте, чтобы оно было доступно при отправке формы.
2. `emailValidationChange` передаёт результат директивы в компонент, а компонент обновляет `emailError`. Шаблон показывает сообщение, если строка ошибки непустая.

Так директива не зависит от конкретного `LoginComponent`, а компонент не знает, каким регулярным выражением проверяется email. Их связывает небольшой явный контракт — объект `FieldValidationResult`.

### 5.4. Что происходит при отправке формы

Нельзя ограничиваться проверкой при вводе: пользователь может отправить форму, не покидая пустое поле. Поэтому при отправке формы компонент должен учитывать актуальное состояние проверки каждого поля. Для email директива должна предоставить способ принудительно выполнить проверку перед отправкой либо форма должна перейти на Angular Forms, где валидаторы интегрированы с состоянием формы.

В рамках следующего шага мы согласуем единый способ запуска проверки при отправке и применим тот же контракт к паролю. Не стоит добавлять вторую копию регулярного выражения в `onSubmit()`: это снова создаст два источника правил и со временем позволит им разойтись.

### 5.5. Что важно в архитектуре

- Директива отвечает за правило и сообщает результат, но не решает, где и как показывать сообщение.
- Компонент хранит состояние формы и определяет поведение интерфейса.
- Шаблон связывает событие директивы с обработчиком компонента и отображает сообщение.
- Правило проверки не должно дублироваться в компоненте и директиве.
- Клиентская валидация помогает пользователю исправить ввод, но не заменяет серверную проверку.

Следующим шагом добавим `PasswordValidatorDirective` и согласуем единый механизм валидации при отправке формы, чтобы `LoginComponent` мог корректно реагировать на ошибки обеих директив.

## 6. Pipes

Раздел о pipes будет добавлен после директив. На примере Personal Finance рассмотрим, для каких задач преобразования отображаемых значений подходят pipes и как они отличаются по назначению от компонентов и директив.
