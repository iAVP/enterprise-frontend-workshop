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

В текущем примере проверка email и пароля находится в `LoginComponent`. Для одной формы это понятно, но при появлении аналогичных полей в других компонентах правила пришлось бы повторять или выносить в отдельную абстракцию.

Директивы позволяют добавлять элементам интерфейса повторно используемое поведение. В следующем подразделе продолжим на тех же полях: сначала рассмотрим директиву проверки email, затем директиву проверки пароля.

При этом ответственность должна оставаться явной: директива отвечает за поведение и проверку конкретного поля, а компонент — за состояние формы и сценарий входа. Прежде чем писать код, определим контракт между директивой и компонентом, чтобы не связывать их сильнее, чем необходимо.

## 6. Pipes

Раздел о pipes будет добавлен после директив. На примере Personal Finance рассмотрим, для каких задач преобразования отображаемых значений подходят pipes и как они отличаются по назначению от компонентов и директив.
