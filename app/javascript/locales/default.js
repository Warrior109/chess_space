import { defineMessages } from 'react-intl';

const defaultLocale = 'uk';

const defaultMessages = defineMessages({"deviseTokenAuthSessionsNotConfirmed":{"id":"devise_token_auth.sessions.not_confirmed","defaultMessage":"Будь ласка підтвердіть реєстрацію згідно інструкціям як ми вислали на Вашу пошту {email}"},"deviseTokenAuthSessionsBadCredentials":{"id":"devise_token_auth.sessions.bad_credentials","defaultMessage":"Логін або пароль введені невірно. Будь ласка, спробуйте ще"},"deviseTokenAuthSessionsNotSupported":{"id":"devise_token_auth.sessions.not_supported","defaultMessage":"Використовуйте POST /sign_in для входу. GET запити не пітримуються."},"deviseTokenAuthSessionsUserNotFound":{"id":"devise_token_auth.sessions.user_not_found","defaultMessage":"Користувач не знайдений або не увійшов в систему"},"deviseTokenAuthTokenValidationsInvalid":{"id":"devise_token_auth.token_validations.invalid","defaultMessage":"Помилкові дані"},"deviseTokenAuthRegistrationsMissingConfirmSuccessUrl":{"id":"devise_token_auth.registrations.missing_confirm_success_url","defaultMessage":"Немає параметру 'confirm_success_url'"},"deviseTokenAuthRegistrationsRedirectUrlNotAllowed":{"id":"devise_token_auth.registrations.redirect_url_not_allowed","defaultMessage":"Перенаправлення до '{redirect_url}' не дозволено."},"deviseTokenAuthRegistrationsEmailAlreadyExists":{"id":"devise_token_auth.registrations.email_already_exists","defaultMessage":"Акаунт для емейлу '{email}' вже існує"},"deviseTokenAuthRegistrationsAccountWithUidDestroyed":{"id":"devise_token_auth.registrations.account_with_uid_destroyed","defaultMessage":"Акаунт з UID '{uid}' було видалено."},"deviseTokenAuthRegistrationsAccountToDestroyNotFound":{"id":"devise_token_auth.registrations.account_to_destroy_not_found","defaultMessage":"Неможливо знайти акаунт для видалення."},"deviseTokenAuthRegistrationsUserNotFound":{"id":"devise_token_auth.registrations.user_not_found","defaultMessage":"Користувача не знайдено"},"deviseTokenAuthOmniauthNotAllowedRedirectUrl":{"id":"devise_token_auth.omniauth.not_allowed_redirect_url","defaultMessage":"Перенаправлення до '{redirect_url}' не дозволено."},"deviseTokenAuthPasswordsMissingEmail":{"id":"devise_token_auth.passwords.missing_email","defaultMessage":"Ви маєте ввести email адресу."},"deviseTokenAuthPasswordsMissingRedirectUrl":{"id":"devise_token_auth.passwords.missing_redirect_url","defaultMessage":"Немає URL для перенаправлення."},"deviseTokenAuthPasswordsNotAllowedRedirectUrl":{"id":"devise_token_auth.passwords.not_allowed_redirect_url","defaultMessage":"Перенаправлення до '{redirect_url}' не дозволено."},"deviseTokenAuthPasswordsSended":{"id":"devise_token_auth.passwords.sended","defaultMessage":"Лист з інструкціями для скидання паролю відправлено на '{email}'."},"deviseTokenAuthPasswordsUserNotFound":{"id":"devise_token_auth.passwords.user_not_found","defaultMessage":"Неможливо знайти користувача по email '{email}'."},"deviseTokenAuthPasswordsPasswordNotRequired":{"id":"devise_token_auth.passwords.password_not_required","defaultMessage":"Цей акаунт не потребує паролю. Увійдіть використовуючи натомість акаунт провайдера '{provider}'."},"deviseTokenAuthPasswordsMissingPasswords":{"id":"devise_token_auth.passwords.missing_passwords","defaultMessage":"Ви маєте заповнити поля з назвами 'Пароль' та 'Підтвердження паролю'."},"deviseTokenAuthPasswordsSuccessfullyUpdated":{"id":"devise_token_auth.passwords.successfully_updated","defaultMessage":"Ваш пароль було успішно оновлено."},"deviseTokenAuthUnlocksMissingEmail":{"id":"devise_token_auth.unlocks.missing_email","defaultMessage":"Ви маєте вказати адресу електронної пошти."},"deviseTokenAuthUnlocksMissingRedirectUrl":{"id":"devise_token_auth.unlocks.missing_redirect_url","defaultMessage":"Відсутня адреса переадресації."},"deviseTokenAuthUnlocksNotAllowedRedirectUrl":{"id":"devise_token_auth.unlocks.not_allowed_redirect_url","defaultMessage":"Переадресація до {redirect_url} не дозволена."},"deviseTokenAuthUnlocksSended":{"id":"devise_token_auth.unlocks.sended","defaultMessage":"Інструкція по відновленню паролю відправлена на Вашу електронну адресу."},"deviseTokenAuthUnlocksUserNotFound":{"id":"devise_token_auth.unlocks.user_not_found","defaultMessage":"Не виходить знайти користувача з електронною адресою {email}."},"deviseTokenAuthUnlocksPasswordNotRequired":{"id":"devise_token_auth.unlocks.password_not_required","defaultMessage":"Цей обліковий запис не потребує паролю. Увійдіть використовуючи обліковий запис '{provider}'."},"deviseTokenAuthUnlocksMissingPasswords":{"id":"devise_token_auth.unlocks.missing_passwords","defaultMessage":"Ви маєте заповнити поля 'пароль' і 'підтвердіть пароль'."},"deviseTokenAuthUnlocksSuccessfullyUpdated":{"id":"devise_token_auth.unlocks.successfully_updated","defaultMessage":"Ваш пароль успішно оновлено."},"errorsMessagesValidateSignUpParams":{"id":"errors.messages.validate_sign_up_params","defaultMessage":"Будь ласка, відправте вірні дані для реєстрації в тілі запиту."},"errorsMessagesValidateAccountUpdateParams":{"id":"errors.messages.validate_account_update_params","defaultMessage":"Будь ласка, відправте вірні дані для оновлення акаунту в тілі запиту."},"errorsMessagesNotEmail":{"id":"errors.messages.not_email","defaultMessage":"не є електронною адресою"},"deviseMailerConfirmationInstructionsSubject":{"id":"devise.mailer.confirmation_instructions.subject","defaultMessage":"Confirmation instructions"},"deviseMailerConfirmationInstructionsConfirmLinkMsg":{"id":"devise.mailer.confirmation_instructions.confirm_link_msg","defaultMessage":"Ви можете підтвердити вашу адресу електронної пошти через посилання нижче:"},"deviseMailerConfirmationInstructionsConfirmAccountLink":{"id":"devise.mailer.confirmation_instructions.confirm_account_link","defaultMessage":"Підтвердіть свій обліковий запис"},"deviseMailerResetPasswordInstructionsSubject":{"id":"devise.mailer.reset_password_instructions.subject","defaultMessage":"Reset password instructions"},"deviseMailerResetPasswordInstructionsRequestResetLinkMsg":{"id":"devise.mailer.reset_password_instructions.request_reset_link_msg","defaultMessage":"Хтось зробив запит на зміну паролю. Ви можете зробити це через посилання нижче."},"deviseMailerResetPasswordInstructionsPasswordChangeLink":{"id":"devise.mailer.reset_password_instructions.password_change_link","defaultMessage":"Змінити пароль"},"deviseMailerResetPasswordInstructionsIgnoreMailMsg":{"id":"devise.mailer.reset_password_instructions.ignore_mail_msg","defaultMessage":"Якщо Ви не робили запит на це, Ви можете проігнорувати цей лист."},"deviseMailerResetPasswordInstructionsNoChangesMsg":{"id":"devise.mailer.reset_password_instructions.no_changes_msg","defaultMessage":"Ваш пароль не зміниться, доки Ви не відкриєте посилання вище і не створите новий пароль."},"deviseMailerUnlockInstructionsSubject":{"id":"devise.mailer.unlock_instructions.subject","defaultMessage":"Unlock instructions"},"deviseMailerUnlockInstructionsAccountLockMsg":{"id":"devise.mailer.unlock_instructions.account_lock_msg","defaultMessage":"Ваш акаунт було заблоковано через надмірну кількість невдалих спроб входу."},"deviseMailerUnlockInstructionsUnlockLinkMsg":{"id":"devise.mailer.unlock_instructions.unlock_link_msg","defaultMessage":"Перейдіть за посиланням нижче, щоб розблокувати свій акаунт:"},"deviseMailerUnlockInstructionsUnlockLink":{"id":"devise.mailer.unlock_instructions.unlock_link","defaultMessage":"Розблокувати мій обліковий запис"},"hello":{"id":"hello","defaultMessage":"привіт"},"welcome":{"id":"welcome","defaultMessage":"вітаємо"},"deviseConfirmationsConfirmed":{"id":"devise.confirmations.confirmed","defaultMessage":"Your email address has been successfully confirmed."},"deviseConfirmationsSendInstructions":{"id":"devise.confirmations.send_instructions","defaultMessage":"You will receive an email with instructions for how to confirm your email address in a few minutes."},"deviseConfirmationsSendParanoidInstructions":{"id":"devise.confirmations.send_paranoid_instructions","defaultMessage":"If your email address exists in our database, you will receive an email with instructions for how to confirm your email address in a few minutes."},"deviseFailureAlreadyAuthenticated":{"id":"devise.failure.already_authenticated","defaultMessage":"You are already signed in."},"deviseFailureInactive":{"id":"devise.failure.inactive","defaultMessage":"Your account is not activated yet."},"deviseFailureInvalid":{"id":"devise.failure.invalid","defaultMessage":"Не вірний {authentication_keys} чи пароль."},"deviseFailureLocked":{"id":"devise.failure.locked","defaultMessage":"Your account is locked."},"deviseFailureLastAttempt":{"id":"devise.failure.last_attempt","defaultMessage":"You have one more attempt before your account is locked."},"deviseFailureNotFoundInDatabase":{"id":"devise.failure.not_found_in_database","defaultMessage":"Не вірний {authentication_keys} чи пароль."},"deviseFailureTimeout":{"id":"devise.failure.timeout","defaultMessage":"Your session expired. Please sign in again to continue."},"deviseFailureUnauthenticated":{"id":"devise.failure.unauthenticated","defaultMessage":"You need to sign in or sign up before continuing."},"deviseFailureUnconfirmed":{"id":"devise.failure.unconfirmed","defaultMessage":"You have to confirm your email address before continuing."},"deviseMailerEmailChangedSubject":{"id":"devise.mailer.email_changed.subject","defaultMessage":"Email Changed"},"deviseMailerPasswordChangeSubject":{"id":"devise.mailer.password_change.subject","defaultMessage":"Password Changed"},"deviseOmniauthCallbacksFailure":{"id":"devise.omniauth_callbacks.failure","defaultMessage":"Could not authenticate you from {kind} because \"{reason}\"."},"deviseOmniauthCallbacksSuccess":{"id":"devise.omniauth_callbacks.success","defaultMessage":"Successfully authenticated from {kind} account."},"devisePasswordsNoToken":{"id":"devise.passwords.no_token","defaultMessage":"You can't access this page without coming from a password reset email. If you do come from a password reset email, please make sure you used the full URL provided."},"devisePasswordsSendInstructions":{"id":"devise.passwords.send_instructions","defaultMessage":"You will receive an email with instructions on how to reset your password in a few minutes."},"devisePasswordsSendParanoidInstructions":{"id":"devise.passwords.send_paranoid_instructions","defaultMessage":"If your email address exists in our database, you will receive a password recovery link at your email address in a few minutes."},"devisePasswordsUpdated":{"id":"devise.passwords.updated","defaultMessage":"Your password has been changed successfully. You are now signed in."},"devisePasswordsUpdatedNotActive":{"id":"devise.passwords.updated_not_active","defaultMessage":"Your password has been changed successfully."},"deviseRegistrationsDestroyed":{"id":"devise.registrations.destroyed","defaultMessage":"Bye! Your account has been successfully cancelled. We hope to see you again soon."},"deviseRegistrationsSignedUp":{"id":"devise.registrations.signed_up","defaultMessage":"Welcome! You have signed up successfully."},"deviseRegistrationsSignedUpButInactive":{"id":"devise.registrations.signed_up_but_inactive","defaultMessage":"You have signed up successfully. However, we could not sign you in because your account is not yet activated."},"deviseRegistrationsSignedUpButLocked":{"id":"devise.registrations.signed_up_but_locked","defaultMessage":"You have signed up successfully. However, we could not sign you in because your account is locked."},"deviseRegistrationsSignedUpButUnconfirmed":{"id":"devise.registrations.signed_up_but_unconfirmed","defaultMessage":"A message with a confirmation link has been sent to your email address. Please follow the link to activate your account."},"deviseRegistrationsUpdateNeedsConfirmation":{"id":"devise.registrations.update_needs_confirmation","defaultMessage":"You updated your account successfully, but we need to verify your new email address. Please check your email and follow the confirmation link to confirm your new email address."},"deviseRegistrationsUpdated":{"id":"devise.registrations.updated","defaultMessage":"Your account has been updated successfully."},"deviseRegistrationsUpdatedButNotSignedIn":{"id":"devise.registrations.updated_but_not_signed_in","defaultMessage":"Your account has been updated successfully, but since your password was changed, you need to sign in again"},"deviseSessionsSignedIn":{"id":"devise.sessions.signed_in","defaultMessage":"Ви успішно увійшли в акаунт."},"deviseSessionsSignedOut":{"id":"devise.sessions.signed_out","defaultMessage":"Ви вийшли з вашого акаунту."},"deviseSessionsAlreadySignedOut":{"id":"devise.sessions.already_signed_out","defaultMessage":"Signed out successfully."},"deviseUnlocksSendInstructions":{"id":"devise.unlocks.send_instructions","defaultMessage":"You will receive an email with instructions for how to unlock your account in a few minutes."},"deviseUnlocksSendParanoidInstructions":{"id":"devise.unlocks.send_paranoid_instructions","defaultMessage":"If your account exists, you will receive an email with instructions for how to unlock it in a few minutes."},"deviseUnlocksUnlocked":{"id":"devise.unlocks.unlocked","defaultMessage":"Your account has been unlocked successfully. Please sign in to continue."},"errorsMessagesAlreadyConfirmed":{"id":"errors.messages.already_confirmed","defaultMessage":"was already confirmed, please try signing in"},"errorsMessagesConfirmationPeriodExpired":{"id":"errors.messages.confirmation_period_expired","defaultMessage":"needs to be confirmed within {period}, please request a new one"},"errorsMessagesExpired":{"id":"errors.messages.expired","defaultMessage":"has expired, please request a new one"},"errorsMessagesNotFound":{"id":"errors.messages.not_found","defaultMessage":"not found"},"errorsMessagesNotLocked":{"id":"errors.messages.not_locked","defaultMessage":"was not locked"},"errorsMessagesNotSavedOne":{"id":"errors.messages.not_saved.one","defaultMessage":"1 error prohibited this {resource} from being saved:"},"errorsMessagesNotSavedOther":{"id":"errors.messages.not_saved.other","defaultMessage":"{count} errors prohibited this {resource} from being saved:"},"pagesProfileEdit":{"id":"pages.profile_edit","defaultMessage":"Редагувати профіль"},"modalsRegistration":{"id":"modals.registration","defaultMessage":"Реєстрація"},"modalsLogIn":{"id":"modals.log_in","defaultMessage":"Вхід"},"actionsRegistrate":{"id":"actions.registrate","defaultMessage":"Зареєструватись"},"actionsLogOut":{"id":"actions.log_out","defaultMessage":"Вийти"},"actionsSignIn":{"id":"actions.sign_in","defaultMessage":"Увійти"},"actionsSaveChanges":{"id":"actions.save_changes","defaultMessage":"Зберегти зміни"},"userFieldsFirstName":{"id":"user.fields.first_name","defaultMessage":"Ім'я"},"userFieldsLastName":{"id":"user.fields.last_name","defaultMessage":"Прізвище"},"userFieldsEmail":{"id":"user.fields.email","defaultMessage":"Email"},"userFieldsPassword":{"id":"user.fields.password","defaultMessage":"Пароль"},"userFieldsPasswordConfirmation":{"id":"user.fields.password_confirmation","defaultMessage":"Підтвердження паролю"},"userFieldsTrainer":{"id":"user.fields.trainer","defaultMessage":"Тренер"},"userFieldsSkillLevel":{"id":"user.fields.skill_level","defaultMessage":"Рівень майстерності"},"userFieldsBirthday":{"id":"user.fields.birthday","defaultMessage":"Дата народження"},"userFieldsCityOfResidence":{"id":"user.fields.city_of_residence","defaultMessage":"Місто проживання"},"userFieldsGoal":{"id":"user.fields.goal","defaultMessage":"Ціль"},"userFieldsAboutMe":{"id":"user.fields.about_me","defaultMessage":"Про себе"},"userSuccessMessagesUpdate":{"id":"user.success_messages.update","defaultMessage":"Дані користувача успішно змінені."}});

export { defaultMessages, defaultLocale };
