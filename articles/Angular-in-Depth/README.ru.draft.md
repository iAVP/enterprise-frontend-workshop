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
  @ViewChild(EmailValidatorDirective) private emailValidator!: EmailValidatorDirective;

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

  validateNow(): void {
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
import { Component, EventEmitter, Output, ViewChild } from '@angular/core';
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

  onSubmit(event: SubmitEvent): void {
    event.preventDefault();
    this.emailValidator.validateNow();
    this.validatePassword();

    if (this.emailError || this.passwordError) {
      return;
    }

    this.loginRequested.emit({ email: this.email, password: this.password });
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

Нельзя ограничиваться проверкой при вводе: пользователь может отправить форму, не покидая пустое поле. Поэтому директива предоставляет публичный метод `validateNow()`, который компонент вызывает перед отправкой. Метод выполняет ту же проверку и синхронно отправляет результат через `emailValidationChange`; обработчик компонента обновляет `emailError` до того, как `onSubmit()` проверит ошибки.

В примере компонент обращается к директиве через `@ViewChild`. Это явный, но достаточно тесный контракт, который подходит для демонстрации взаимодействия. Для более сложных форм стоит рассмотреть Angular Forms и интерфейс `Validator`, чтобы состояние всех полей и запуск проверки при отправке управлялись формой единообразно. Не нужно добавлять вторую копию регулярного выражения в `onSubmit()`: это снова создаст два источника правил.

### 5.5. Что важно в архитектуре

- Директива отвечает за правило и сообщает результат, но не решает, где и как показывать сообщение.
- Компонент хранит состояние формы и определяет поведение интерфейса.
- Шаблон связывает событие директивы с обработчиком компонента и отображает сообщение.
- Правило проверки не должно дублироваться в компоненте и директиве.
- Клиентская валидация помогает пользователю исправить ввод, но не заменяет серверную проверку.

Следующим шагом добавим `PasswordValidatorDirective` и согласуем единый механизм валидации при отправке формы, чтобы `LoginComponent` мог корректно реагировать на ошибки обеих директив.


## 7. Pipes: форматирование денежных значений

В Personal Finance сумму следует хранить числом, а форматировать только при отображении. Встроенный CurrencyPipe подходит для этой задачи. Он не меняет исходную сумму и не выполняет конвертацию валют.

### 7.1. CurrencyPipe в компоненте

```typescript
import { CurrencyPipe } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-balance-summary',
  standalone: true,
  imports: [CurrencyPipe],
  template: '<section><h2>Current balance</h2><p>{{ balance | currency:"EUR":"symbol":"1.2-2" }}</p></section>',
})
export class BalanceSummaryComponent {
  @Input() balance = 0;
}
```

Параметры pipe задают валюту, отображение обозначения и количество дробных знаков. Разделители и положение символа зависят от локали приложения; если нужна единая локаль, её следует настроить на уровне приложения.

### 7.2. Форматирование списка операций

```html
<ul class="transactions">
  @for (transaction of transactions; track transaction.id) {
    <li>
      <span>{{ transaction.description }}</span>
      <span>{{ transaction.amount | currency:"EUR":"symbol":"1.2-2" }}</span>
    </li>
  }
</ul>
```

Модель хранит amount как число. Не следует заранее превращать сумму в строку с символом евро: строку неудобно использовать для вычислений, сортировки и повторного форматирования.

- Модель хранит числовую сумму.
- Компонент выбирает, какие операции и итоги показать.
- Pipe форматирует число для чтения.
- Конвертация валют, если она понадобится, является отдельной бизнес-операцией с курсом и правилами округления.

Документация: [Angular — Pipes](https://angular.dev/guide/templates/pipes) и [CurrencyPipe API](https://angular.dev/api/common/CurrencyPipe).

## 8. Implementation: приложение Personal Finance

На заключительном этапе страницы связываются общим состоянием. Приложение показывает операции доходов и расходов, рассчитывает баланс и сохраняет изменения в localStorage. Это демонстрационное клиентское хранилище, а не замена backend или синхронизации между устройствами.

### 8.1. Модель операции

```typescript
export type TransactionType = 'income' | 'expense';

export interface Transaction {
  id: string;
  type: TransactionType;
  description: string;
  amount: number;
  date: string;
}
```

Сумма хранится положительным числом, а направление задаётся type. При расчёте баланса доходы прибавляются, расходы вычитаются.

### 8.2. TransactionStore

```typescript
import { Injectable, computed, signal } from '@angular/core';
import { Transaction } from './transaction.model';

const STORAGE_KEY = 'personal-finance.transactions';

const DEMO_TRANSACTIONS: Transaction[] = [
  { id: 'demo-01', type: 'income', description: 'Salary', amount: 3200, date: '2026-10-01' },
  { id: 'demo-02', type: 'expense', description: 'Rent', amount: 1100, date: '2026-10-02' },
  { id: 'demo-03', type: 'expense', description: 'Groceries', amount: 86.4, date: '2026-10-03' },
  { id: 'demo-04', type: 'income', description: 'Freelance work', amount: 450, date: '2026-10-04' },
  { id: 'demo-05', type: 'expense', description: 'Transport', amount: 49, date: '2026-10-05' },
  { id: 'demo-06', type: 'expense', description: 'Utilities', amount: 125.7, date: '2026-10-06' },
  { id: 'demo-07', type: 'income', description: 'Refund', amount: 35, date: '2026-10-07' },
  { id: 'demo-08', type: 'expense', description: 'Books', amount: 28.9, date: '2026-10-08' },
  { id: 'demo-09', type: 'expense', description: 'Restaurant', amount: 42.5, date: '2026-10-09' },
  { id: 'demo-10', type: 'income', description: 'Interest', amount: 12.35, date: '2026-10-10' },
];

@Injectable({ providedIn: 'root' })
export class TransactionStore {
  private readonly state = signal<Transaction[]>(this.loadTransactions());
  readonly transactions = this.state.asReadonly();

  readonly balance = computed(() =>
    this.state().reduce(
      (total, transaction) =>
        total + (transaction.type === 'income' ? transaction.amount : -transaction.amount),
      0,
    ),
  );

  addTransaction(transaction: Omit<Transaction, 'id'>): void {
    this.saveTransactions([
      { ...transaction, id: crypto.randomUUID() },
      ...this.state(),
    ]);
  }

  private loadTransactions(): Transaction[] {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved !== null) {
        const parsed: unknown = JSON.parse(saved);
        if (Array.isArray(parsed)) return parsed as Transaction[];
      }
    } catch {
      // If storage is unavailable or contains invalid JSON, use demo data.
    }
    return DEMO_TRANSACTIONS;
  }

  private saveTransactions(transactions: Transaction[]): void {
    this.state.set(transactions);
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(transactions));
    } catch {
      // Current session remains usable, but persistence may be unavailable.
    }
  }
}
```

Сервис — единственное место, которое изменяет коллекцию операций. Компоненты читают её и вызывают метод добавления. Вычисляемый сигнал balance пересчитывается при изменении списка, поэтому экрану не нужно хранить отдельную копию баланса.

При первом запуске без сохранённых данных загружаются десять демонстрационных операций. Если localStorage содержит сохранённый массив, используется он. Для реального приложения данные следует проверять по схеме; локальное хранилище не обеспечивает серверную проверку, резервное копирование или синхронизацию.

### 8.3. Dashboard

```typescript
import { CurrencyPipe, DatePipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { TransactionStore } from '../../shared/transaction.store';

@Component({
  selector: 'app-dashboard-page',
  standalone: true,
  imports: [CurrencyPipe, DatePipe],
  template: '<main><h1>Personal Finance</h1><section><h2>Current balance</h2><p>{{ store.balance() | currency:"EUR":"symbol":"1.2-2" }}</p></section><section><h2>Transactions</h2><ul>@for (transaction of store.transactions(); track transaction.id) {<li><span>{{ transaction.date | date:"mediumDate" }}</span><span>{{ transaction.description }}</span><span>{{ transaction.type === "income" ? "+" : "−" }} {{ transaction.amount | currency:"EUR":"symbol":"1.2-2" }}</span></li>}</ul></section></main>',
})
export class DashboardPage {
  readonly store = inject(TransactionStore);
}
```

Этот компактный пример показывает связь страницы с сервисом. В окончательной структуре шаблон и стили можно вынести в отдельные файлы, а путь импорта сервиса нужно привести в соответствие с реальной структурой workspace.

### 8.4. Добавление дохода или расхода

Метод, вызываемый компонентом формы после чтения полей, может выглядеть так:

```typescript
saveTransaction(): void {
  const amount = Number(this.amountInput);

  if (!this.description.trim() || !Number.isFinite(amount) || amount <= 0) {
    this.errorMessage = 'Enter a description and an amount greater than zero.';
    return;
  }

  this.store.addTransaction({
    type: this.transactionType,
    description: this.description.trim(),
    amount,
    date: this.dateInput,
  });

  this.errorMessage = '';
}
```

Здесь amountInput, description, transactionType, dateInput и errorMessage — свойства компонента формы, а store — внедрённый TransactionStore. Это фрагмент метода, а не самостоятельный полный класс.

### 8.5. Маршруты

Пример маршрутов для входа, обзора, добавления дохода и добавления расхода. Имена файлов и экспортируемых классов необходимо согласовать с фактической структурой workspace.

```typescript
import { Routes } from '@angular/router';

export const appRoutes: Routes = [
  {
    path: 'login',
    loadComponent: () =>
      import('./pages/login/login.page').then((m) => m.LoginPage),
  },
  {
    path: 'dashboard',
    loadComponent: () =>
      import('./pages/dashboard/dashboard.page').then((m) => m.DashboardPage),
  },
  {
    path: 'add-income',
    loadComponent: () =>
      import('./pages/add-income/add-income.page').then((m) => m.AddIncomePage),
  },
  {
    path: 'add-expense',
    loadComponent: () =>
      import('./pages/add-expense/add-expense.page').then((m) => m.AddExpensePage),
  },
  { path: '', pathMatch: 'full', redirectTo: 'dashboard' },
  { path: '**', redirectTo: 'dashboard' },
];
```

Маршрутизация выбирает отображаемую страницу, но сама по себе не обеспечивает авторизацию. В этой учебной версии LoginComponent демонстрирует обработку формы, а не полноценный механизм безопасности.

## 9. Проверка перед публикацией

После интеграции этапов проверь проект в реальном workspace:

- npx nx show projects — убедиться, что нужные проекты существуют;
- npx nx lint personal-finance — запустить lint, если у приложения настроена соответствующая цель;
- npx nx build personal-finance — проверить сборку;
- вручную проверить валидацию, добавление дохода и расхода, перезагрузку страницы и восстановление сохранённых данных.

Это план проверки, а не утверждение, что команды уже запускались. Перед публикацией нужно сверить импорты, имена проектов, версии Angular и NX и настройки lint. Кодовые фрагменты следует проверить в контексте настоящего workspace.

## Итог

Четыре этапа описывают развитие одного приложения: компоненты связывают состояние и представление, директивы выносят повторно используемое поведение, pipes форматируют значения для отображения, а общий сервис связывает страницы и сохраняет данные.

Главная практическая мысль — разделять ответственность по необходимости. Каждое выделение должно решать конкретную задачу и упрощать дальнейшее развитие приложения.

## Официальная документация

- [Angular — Components](https://angular.dev/guide/components)
- [Angular — Templates](https://angular.dev/guide/templates)
- [Angular — Directives](https://angular.dev/guide/directives)
- [Angular — Pipes](https://angular.dev/guide/templates/pipes)
- [Angular — Signals](https://angular.dev/guide/signals)
- [Angular — Routing](https://angular.dev/guide/routing)
