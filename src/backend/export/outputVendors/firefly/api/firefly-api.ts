/* eslint-disable */
/* tslint:disable */
/*
 * ---------------------------------------------------------------
 * ## THIS FILE WAS GENERATED VIA SWAGGER-TYPESCRIPT-API        ##
 * ##                                                           ##
 * ## AUTHOR: acacode                                           ##
 * ## SOURCE: https://github.com/acacode/swagger-typescript-api ##
 * ---------------------------------------------------------------
 */

export interface AccountArray {
  data: AccountRead[];
  meta: Meta;
}

export interface AttachmentArray {
  data: AttachmentRead[];
  meta: Meta;
}

export type AutocompleteAccountArray = AutocompleteAccount[];

export type AutocompleteBillArray = AutocompleteBill[];

export type AutocompleteBudgetArray = AutocompleteBudget[];

export type AutocompleteCategoryArray = AutocompleteCategory[];

export type AutocompleteCurrencyArray = AutocompleteCurrency[];

export type AutocompleteCurrencyCodeArray = AutocompleteCurrencyCode[];

export type AutocompleteObjectGroupArray = AutocompleteObjectGroup[];

export type AutocompletePiggyArray = AutocompletePiggy[];

export type AutocompletePiggyBalanceArray = AutocompletePiggyBalance[];

export type AutocompleteRecurrenceArray = AutocompleteRecurrence[];

export type AutocompleteRuleArray = AutocompleteRule[];

export type AutocompleteRuleGroupArray = AutocompleteRuleGroup[];

export type AutocompleteTagArray = AutocompleteTag[];

export type AutocompleteTransactionArray = AutocompleteTransaction[];

export type AutocompleteTransactionIDArray = AutocompleteTransactionID[];

export type AutocompleteTransactionTypeArray = AutocompleteTransactionType[];

export interface AvailableBudgetArray {
  data: AvailableBudgetRead[];
  meta: Meta;
}

export interface BillArray {
  data: BillRead[];
  meta: Meta;
}

export interface BudgetArray {
  data: BudgetRead[];
  meta: Meta;
}

export interface BudgetLimitArray {
  data: BudgetLimitRead[];
  meta: Meta;
}

export interface CategoryArray {
  data: CategoryRead[];
  meta: Meta;
}

export type ConfigurationArray = Configuration[];

export interface CurrencyArray {
  data: CurrencyRead[];
  meta: Meta;
  links: PageLink;
}

export interface LinkTypeArray {
  data: LinkTypeRead[];
  meta: Meta;
  links: PageLink;
}

export interface ObjectGroupArray {
  data: ObjectGroupRead[];
  meta: Meta;
}

export interface PiggyBankArray {
  data: PiggyBankRead[];
  meta: Meta;
  links: PageLink;
}

export interface PiggyBankEventArray {
  data: PiggyBankEventRead[];
  meta: Meta;
  links: PageLink;
}

export interface PreferenceArray {
  data: PreferenceRead[];
  meta: Meta;
  links: PageLink;
}

export interface RecurrenceArray {
  data: RecurrenceRead[];
  meta: Meta;
  links: PageLink;
}

export interface RuleArray {
  data: RuleRead[];
  meta: Meta;
  links: PageLink;
}

export interface RuleGroupArray {
  data: RuleGroupRead[];
  meta: Meta;
  links: PageLink;
}

export interface TagArray {
  data: TagRead[];
  meta: Meta;
  links: PageLink;
}

export interface TransactionArray {
  data: TransactionRead[];
  meta: Meta;
  links: PageLink;
}

export interface TransactionLinkArray {
  data: TransactionLinkRead[];
  meta: Meta;
  links: PageLink;
}

export interface UserArray {
  data: UserRead[];
  meta: Meta;
  links: PageLink;
}

export interface WebhookArray {
  data: WebhookRead[];
  meta: Meta;
  links: PageLink;
}

export interface WebhookAttemptArray {
  data: WebhookAttemptRead[];
  meta: Meta;
}

export interface WebhookMessageArray {
  data: WebhookMessageRead[];
  meta: Meta;
}

export interface AutocompleteAccount {
  /**
   * @format string
   * @example "2"
   */
  id: string;
  /**
   * Name of the account found by an auto-complete search.
   * @format string
   * @example "Checking Account"
   */
  name: string;
  /**
   * Asset accounts and liabilities have a second field with the given date's account balance.
   * @format string
   * @example "Checking Account ($123.45)"
   */
  name_with_balance: string;
  /**
   * Account type of the account found by the auto-complete search.
   * @format string
   * @example "Asset account"
   */
  type: string;
  /**
   * ID for the currency used by this account.
   * @format string
   * @example "12"
   */
  currency_id: string;
  /**
   * Currency name for the currency used by this account.
   * @format string
   * @example "Euro"
   */
  currency_name: string;
  /**
   * Currency code for the currency used by this account.
   * @format string
   * @example "EUR"
   */
  currency_code: string;
  /**
   * Currency symbol for the currency used by this account.
   * @format string
   * @example "$"
   */
  currency_symbol: string;
  /**
   * Number of decimal places for the currency used by this account.
   * @format int32
   * @example 2
   */
  currency_decimal_places: number;
}

export interface AutocompleteBill {
  /**
   * @format string
   * @example "2"
   */
  id: string;
  /**
   * Name of the bill found by an auto-complete search.
   * @format string
   * @example "Yearly bill"
   */
  name: string;
  /**
   * Is the bill active or not?
   * @format boolean
   * @example true
   */
  active?: boolean;
}

export interface AutocompleteBudget {
  /**
   * @format string
   * @example "2"
   */
  id: string;
  /**
   * Name of the budget found by an auto-complete search.
   * @format string
   * @example "Groceries"
   */
  name: string;
}

export interface AutocompleteCategory {
  /**
   * @format string
   * @example "2"
   */
  id: string;
  /**
   * Name of the category found by an auto-complete search.
   * @format string
   * @example "Category X"
   */
  name: string;
}

export interface AutocompleteCurrency {
  /**
   * @format string
   * @example "2"
   */
  id: string;
  /**
   * Currency name.
   * @format string
   * @example "Currency name"
   */
  name: string;
  /**
   * Currency code.
   * @format string
   * @example "EUR"
   */
  code: string;
  /**
   * @format string
   * @example "$"
   */
  symbol: string;
  /**
   * @format int32
   * @example 2
   */
  decimal_places: number;
}

export interface AutocompleteCurrencyCode {
  /**
   * @format string
   * @example "2"
   */
  id: string;
  /**
   * Currency name with the code between brackets.
   * @format string
   * @example "Currency name (XCN)"
   */
  name: string;
  /**
   * Currency code.
   * @format string
   * @example "EUR"
   */
  code: string;
  /**
   * @format string
   * @example "$"
   */
  symbol: string;
  /**
   * @format int32
   * @example 2
   */
  decimal_places: number;
}

export interface AutocompleteObjectGroup {
  /**
   * @format string
   * @example "2"
   */
  id: string;
  /**
   * Title of the object group found by an auto-complete search.
   * @format string
   * @example "Object Group one"
   */
  title: string;
  /**
   * Title of the object group found by an auto-complete search.
   * @format string
   * @example "Object Group one"
   */
  name: string;
}

export interface AutocompletePiggy {
  /**
   * @format string
   * @example "2"
   */
  id: string;
  /**
   * Name of the piggy bank found by an auto-complete search.
   * @format string
   * @example "New couch"
   */
  name: string;
  /**
   * Currency ID for this piggy bank.
   * @format string
   * @example "12"
   */
  currency_id?: string;
  /**
   * Currency code for this piggy bank.
   * @format string
   * @example "EUR"
   */
  currency_code?: string;
  /**
   * @format string
   * @example "$"
   */
  currency_symbol?: string;
  /**
   * Currency name for the currency used by this account.
   * @format string
   * @example "Euro"
   */
  currency_name?: string;
  /**
   * @format int32
   * @example 2
   */
  currency_decimal_places?: number;
  /**
   * The group ID of the group this object is part of. NULL if no group.
   * @format string
   * @example "5"
   */
  object_group_id?: string | null;
  /**
   * The name of the group. NULL if no group.
   * @format string
   * @example "Example Group"
   */
  object_group_title?: string | null;
}

export interface AutocompletePiggyBalance {
  /**
   * @format string
   * @example "2"
   */
  id: string;
  /**
   * Name of the piggy bank found by an auto-complete search.
   * @format string
   * @example "New couch"
   */
  name: string;
  /**
   * Name of the piggy bank found by an auto-complete search with the current balance formatted nicely.
   * @format string
   * @example "New couch ($ 12.34)"
   */
  name_with_balance?: string;
  /**
   * Currency ID for this piggy bank.
   * @format string
   * @example "12"
   */
  currency_id?: string;
  /**
   * Currency code for this piggy bank.
   * @format string
   * @example "EUR"
   */
  currency_code?: string;
  /**
   * @format string
   * @example "$"
   */
  currency_symbol?: string;
  /**
   * @format int32
   * @example 2
   */
  currency_decimal_places?: number;
  /**
   * The group ID of the group this object is part of. NULL if no group.
   * @format string
   * @example "5"
   */
  object_group_id?: string | null;
  /**
   * The name of the group. NULL if no group.
   * @format string
   * @example "Example Group"
   */
  object_group_title?: string | null;
}

export interface AutocompleteRecurrence {
  /**
   * @format string
   * @example "2"
   */
  id: string;
  /**
   * Name of the recurrence found by an auto-complete search.
   * @format string
   * @example "Yearly bill"
   */
  name: string;
  /**
   * Description of the recurrence found by auto-complete.
   * @format string
   * @example "Should trigger daily."
   */
  description?: string;
}

export interface AutocompleteRule {
  /**
   * @format string
   * @example "2"
   */
  id: string;
  /**
   * Name of the rule found by an auto-complete search.
   * @format string
   * @example "Rule one"
   */
  name: string;
  /**
   * Description of the rule found by auto-complete.
   * @format string
   * @example "Useful rule."
   */
  description?: string;
}

export interface AutocompleteRuleGroup {
  /**
   * @format string
   * @example "2"
   */
  id: string;
  /**
   * Name of the rule group found by an auto-complete search.
   * @format string
   * @example "Rule group one"
   */
  name: string;
  /**
   * Description of the rule group found by auto-complete.
   * @format string
   * @example "Some rule group."
   */
  description?: string;
}

export interface AutocompleteTag {
  /**
   * @format string
   * @example "2"
   */
  id: string;
  /**
   * Name of the tag found by an auto-complete search.
   * @format string
   * @example "too-expensive-tag-example"
   */
  name: string;
  /**
   * Name of the tag found by an auto-complete search.
   * @format string
   * @example "too-expensive-tag-example"
   */
  tag: string;
}

export interface AutocompleteTransaction {
  /**
   * The ID of a transaction journal (basically a single split).
   * @format string
   * @example "2"
   */
  id: string;
  /**
   * The ID of the underlying transaction group.
   * @format string
   * @example "2"
   */
  transaction_group_id?: string;
  /**
   * Transaction description
   * @format string
   * @example "Transaction"
   */
  name: string;
  /**
   * Transaction description
   * @format string
   * @example "Transaction"
   */
  description: string;
}

export interface AutocompleteTransactionID {
  /**
   * The ID of a transaction journal (basically a single split).
   * @format string
   * @example "2"
   */
  id: string;
  /**
   * The ID of the underlying transaction group.
   * @format string
   * @example "2"
   */
  transaction_group_id?: string;
  /**
   * Transaction description with ID in the name.
   * @format string
   * @example "#12: Transaction"
   */
  name: string;
  /**
   * Transaction description with ID in the name.
   * @format string
   * @example "#12: Transaction"
   */
  description: string;
}

export interface AutocompleteTransactionType {
  /**
   * @format string
   * @example "2"
   */
  id: string;
  /**
   * Type of the object found by an auto-complete search.
   * @format string
   * @example "Withdrawal"
   */
  name: string;
  /**
   * Name of the object found by an auto-complete search.
   * @format string
   * @example "Withdrawal"
   */
  type: string;
}

export interface ChartDataPoint {
  /**
   * The key is the label of the value, so for example: '2018-01-01' => 13 or 'Groceries' => -123.
   * @format string
   * @example "value"
   */
  key?: string;
}

export interface ChartDataSet {
  /**
   * This is the title of the current set. It can refer to an account, a budget or another object (by name).
   * @format string
   * @example "Checking account"
   */
  label?: string;
  /**
   * The currency ID of the currency associated to the data in the entries.
   * @format string
   * @example "5"
   */
  currency_id?: string;
  /**
   * @format string
   * @example "EUR"
   */
  currency_code?: string;
  /**
   * @format string
   * @example "$"
   */
  currency_symbol?: string;
  /**
   * Number of decimals for the currency associated to the data in the entries.
   * @format int32
   * @example 2
   */
  currency_decimal_places?: number;
  /**
   * @format date-time
   * @example "2018-09-17T12:46:47+01:00"
   */
  start_date?: string;
  /**
   * @format date-time
   * @example "2018-09-17T12:46:47+01:00"
   */
  end_date?: string;
  /**
   * Indicated the type of chart that is expected to be rendered. You can safely ignore this if you want.
   * @format string
   * @example "line"
   */
  type?: string;
  /**
   * Used to indicate the Y axis for this data set. Is usually between 0 and 1 (left and right side of the chart).
   * @format int32
   * @example 0
   */
  yAxisID?: number;
  /** The actual entries for this data set. They 'key' value is the label for the data point. The value is the actual (numerical) value. */
  entries?: object;
}

export type ChartLine = ChartDataSet[];

export enum DataDestroyObject {
  NotAssetsLiabilities = 'not_assets_liabilities',
  Budgets = 'budgets',
  Bills = 'bills',
  PiggyBanks = 'piggy_banks',
  Rules = 'rules',
  Recurring = 'recurring',
  Categories = 'categories',
  Tags = 'tags',
  ObjectGroups = 'object_groups',
  Accounts = 'accounts',
  AssetAccounts = 'asset_accounts',
  ExpenseAccounts = 'expense_accounts',
  RevenueAccounts = 'revenue_accounts',
  Liabilities = 'liabilities',
  Transactions = 'transactions',
  Withdrawals = 'withdrawals',
  Deposits = 'deposits',
  Transfers = 'transfers',
}

export enum AccountSearchFieldFilter {
  All = 'all',
  Iban = 'iban',
  Name = 'name',
  Number = 'number',
  Id = 'id',
}

/**
 * Title of the configuration value.
 * @example "configuration.is_demo_site"
 */
export enum ConfigValueFilter {
  ConfigurationIsDemoSite = 'configuration.is_demo_site',
  ConfigurationPermissionUpdateCheck = 'configuration.permission_update_check',
  ConfigurationLastUpdateCheck = 'configuration.last_update_check',
  ConfigurationSingleUserMode = 'configuration.single_user_mode',
  FireflyVersion = 'firefly.version',
  FireflyApiVersion = 'firefly.api_version',
  FireflyDefaultLocation = 'firefly.default_location',
  FireflyAccountToTransaction = 'firefly.account_to_transaction',
  FireflyAllowedOpposingTypes = 'firefly.allowed_opposing_types',
  FireflyAccountRoles = 'firefly.accountRoles',
  FireflyValidLiabilities = 'firefly.valid_liabilities',
  FireflyInterestPeriods = 'firefly.interest_periods',
  FireflyEnableExternalMap = 'firefly.enable_external_map',
  FireflyExpectedSourceTypes = 'firefly.expected_source_types',
  AppTimezone = 'app.timezone',
  FireflyBillPeriods = 'firefly.bill_periods',
  FireflyCreditCardTypes = 'firefly.credit_card_types',
  FireflyLanguages = 'firefly.languages',
  FireflyValidViewRanges = 'firefly.valid_view_ranges',
}

export enum ConfigValueUpdateFilter {
  ConfigurationIsDemoSite = 'configuration.is_demo_site',
  ConfigurationPermissionUpdateCheck = 'configuration.permission_update_check',
  ConfigurationLastUpdateCheck = 'configuration.last_update_check',
  ConfigurationSingleUserMode = 'configuration.single_user_mode',
}

export enum ExportFileFilter {
  Csv = 'csv',
}

export type InsightGroup = InsightGroupEntry[];

export interface InsightGroupEntry {
  /**
   * This ID is a reference to the original object.
   * @format string
   * @example "123"
   */
  id?: string;
  /**
   * This is the name of the object.
   * @format string
   * @example "Land lord"
   */
  name?: string;
  /**
   * The amount spent or earned between start date and end date, a number defined as a string, for this object and all asset accounts.
   * @format string
   * @example "-123.45"
   */
  difference?: string;
  /**
   * The amount spent or earned between start date and end date, a number as a float, for this object and all asset accounts. May have rounding errors.
   * @format double
   * @example -123.45
   */
  difference_float?: number;
  /**
   * The currency ID of the expenses listed for this account.
   * @format string
   * @example "5"
   */
  currency_id?: string;
  /**
   * The currency code of the expenses listed for this account.
   * @format string
   * @example "EUR"
   */
  currency_code?: string;
}

export type InsightTotal = InsightTotalEntry[];

export interface InsightTotalEntry {
  /**
   * The amount spent between start date and end date, defined as a string, for this expense account and all asset accounts.
   * @format string
   * @example "123.45"
   */
  difference?: string;
  /**
   * The amount spent between start date and end date, defined as a string, for this expense account and all asset accounts. This number is a float (double) and may have rounding errors.
   * @format double
   * @example 123.45
   */
  difference_float?: number;
  /**
   * The currency ID of the expenses listed for this expense account.
   * @format string
   * @example "5"
   */
  currency_id?: string;
  /**
   * The currency code of the expenses listed for this expense account.
   * @format string
   * @example "EUR"
   */
  currency_code?: string;
}

export type InsightTransfer = InsightTransferEntry[];

export interface InsightTransferEntry {
  /**
   * This ID is a reference to the original object.
   * @format string
   * @example "123"
   */
  id?: string;
  /**
   * This is the name of the object.
   * @format string
   * @example "Land lord"
   */
  name?: string;
  /**
   * The total amount transferred between start date and end date, a number defined as a string, for this asset account.
   * @format string
   * @example "-123.45"
   */
  difference?: string;
  /**
   * The total amount transferred between start date and end date, a number as a float, for this asset account. May have rounding errors.
   * @format double
   * @example -123.45
   */
  difference_float?: number;
  /**
   * The total amount transferred TO this account between start date and end date, a number defined as a string, for this asset account.
   * @format string
   * @example "123.45"
   */
  in?: string;
  /**
   * The total amount transferred FROM this account between start date and end date, a number as a float, for this asset account. May have rounding errors.
   * @format double
   * @example 123.45
   */
  in_float?: number;
  /**
   * The total amount transferred FROM this account between start date and end date, a number defined as a string, for this asset account.
   * @format string
   * @example "123.45"
   */
  out?: string;
  /**
   * The total amount transferred TO this account between start date and end date, a number as a float, for this asset account. May have rounding errors.
   * @format double
   * @example 123.45
   */
  out_float?: number;
  /**
   * The currency ID of the expenses listed for this account.
   * @format string
   * @example "5"
   */
  currency_id?: string;
  /**
   * The currency code of the expenses listed for this account.
   * @format string
   * @example "EUR"
   */
  currency_code?: string;
}

export interface AccountRead {
  /**
   * Immutable value
   * @format string
   * @example "accounts"
   */
  type: string;
  /**
   * @format string
   * @example "2"
   */
  id: string;
  attributes: Account;
}

export interface AccountSingle {
  data: AccountRead;
}

export interface AttachmentRead {
  /**
   * Immutable value
   * @format string
   * @example "attachments"
   */
  type: string;
  /**
   * @format string
   * @example "2"
   */
  id: string;
  attributes: Attachment;
  links: ObjectLink;
}

export interface AttachmentSingle {
  data: AttachmentRead;
}

export interface AvailableBudgetRead {
  /**
   * Immutable value
   * @format string
   * @example "available_budgets"
   */
  type: string;
  /**
   * @format string
   * @example "2"
   */
  id: string;
  attributes: AvailableBudget;
}

export interface AvailableBudgetSingle {
  data: AvailableBudgetRead;
}

export interface BillRead {
  /**
   * Immutable value
   * @format string
   * @example "bills"
   */
  type: string;
  /**
   * @format string
   * @example "2"
   */
  id: string;
  attributes: Bill;
}

export interface BillSingle {
  data: BillRead;
}

export interface BudgetLimitRead {
  /**
   * Immutable value
   * @format string
   * @example "budget_limits"
   */
  type: string;
  /**
   * @format string
   * @example "2"
   */
  id: string;
  attributes: BudgetLimit;
}

export interface BudgetLimitSingle {
  data: BudgetLimitRead;
}

export interface BudgetRead {
  /**
   * Immutable value
   * @format string
   * @example "budgets"
   */
  type: string;
  /**
   * @format string
   * @example "2"
   */
  id: string;
  attributes: Budget;
}

export interface BudgetSingle {
  data: BudgetRead;
}

export interface CategoryRead {
  /**
   * Immutable value
   * @format string
   * @example "categories"
   */
  type: string;
  /**
   * @format string
   * @example "2"
   */
  id: string;
  attributes: Category;
}

export interface CategorySingle {
  data: CategoryRead;
}

export interface ConfigurationSingle {
  data: Configuration;
}

export interface CurrencyRead {
  /**
   * Immutable value
   * @format string
   * @example "currencies"
   */
  type: string;
  /**
   * @format string
   * @example "2"
   */
  id: string;
  attributes: Currency;
}

export interface CurrencySingle {
  data: CurrencyRead;
}

export interface LinkTypeRead {
  /**
   * Immutable value
   * @format string
   * @example "link_types"
   */
  type: string;
  /**
   * @format string
   * @example "2"
   */
  id: string;
  attributes: LinkType;
  links: ObjectLink;
}

export interface LinkTypeSingle {
  data: LinkTypeRead;
}

export interface ObjectGroupRead {
  /**
   * Immutable value
   * @format string
   * @example "object_groups"
   */
  type: string;
  /**
   * @format string
   * @example "2"
   */
  id: string;
  attributes: ObjectGroup;
}

export interface ObjectGroupSingle {
  data: ObjectGroupRead;
}

export interface PiggyBankEventRead {
  /**
   * Immutable value
   * @format string
   * @example "piggy_bank_events"
   */
  type: string;
  /**
   * @format string
   * @example "2"
   */
  id: string;
  attributes: PiggyBankEvent;
  links: ObjectLink;
}

export interface PiggyBankRead {
  /**
   * Immutable value
   * @format string
   * @example "piggy_banks"
   */
  type: string;
  /**
   * @format string
   * @example "2"
   */
  id: string;
  attributes: PiggyBank;
  links: ObjectLink;
}

export interface PiggyBankSingle {
  data: PiggyBankRead;
}

export interface PreferenceRead {
  /**
   * Immutable value
   * @format string
   * @example "preferences"
   */
  type: string;
  /**
   * @format string
   * @example "2"
   */
  id: string;
  attributes: Preference;
}

export interface PreferenceSingle {
  data: PreferenceRead;
}

export interface RecurrenceRead {
  /**
   * Immutable value
   * @format string
   * @example "recurrences"
   */
  type: string;
  /**
   * @format string
   * @example "2"
   */
  id: string;
  attributes: Recurrence;
  links: ObjectLink;
}

export interface RecurrenceSingle {
  data: RecurrenceRead;
}

export interface RuleGroupRead {
  /**
   * Immutable value
   * @format string
   * @example "rules_group"
   */
  type: string;
  /**
   * @format string
   * @example "2"
   */
  id: string;
  attributes: RuleGroup;
  links: ObjectLink;
}

export interface RuleGroupSingle {
  data: RuleGroupRead;
}

export interface RuleRead {
  /**
   * Immutable value
   * @format string
   * @example "rules"
   */
  type: string;
  /**
   * @format string
   * @example "2"
   */
  id: string;
  attributes: Rule;
  links: ObjectLink;
}

export interface RuleSingle {
  data: RuleRead;
}

export interface TagRead {
  /**
   * Immutable value
   * @format string
   * @example "tags"
   */
  type: string;
  /**
   * @format string
   * @example "2"
   */
  id: string;
  attributes: TagModel;
  links: ObjectLink;
}

export interface TagSingle {
  data: TagRead;
}

export interface TransactionLinkRead {
  /**
   * Immutable value
   * @format string
   * @example "transactionLinks"
   */
  type: string;
  /**
   * @format string
   * @example "2"
   */
  id: string;
  attributes: TransactionLink;
  links: ObjectLink;
}

export interface TransactionLinkSingle {
  data: TransactionLinkRead;
}

export interface TransactionRead {
  /**
   * Immutable value
   * @format string
   * @example "transactions"
   */
  type: string;
  /**
   * @format string
   * @example "2"
   */
  id: string;
  attributes: Transaction;
  links: ObjectLink;
}

export interface TransactionSingle {
  data: TransactionRead;
}

export interface UserRead {
  /**
   * Immutable value
   * @format string
   * @example "users"
   */
  type: string;
  /**
   * @format string
   * @example "2"
   */
  id: string;
  attributes: User;
  links: ObjectLink;
}

export interface WebhookAttemptRead {
  /**
   * Immutable value
   * @format string
   * @example "webhook_attempts"
   */
  type: string;
  /**
   * @format string
   * @example "2"
   */
  id: string;
  attributes: WebhookAttempt;
}

export interface WebhookAttemptSingle {
  data: WebhookAttemptRead;
}

export interface WebhookMessageRead {
  /**
   * Immutable value
   * @format string
   * @example "webhook_messages"
   */
  type: string;
  /**
   * @format string
   * @example "2"
   */
  id: string;
  attributes: WebhookMessage;
}

export interface WebhookMessageSingle {
  data: WebhookMessageRead;
}

export interface WebhookRead {
  /**
   * Immutable value
   * @format string
   * @example "webhooks"
   */
  type: string;
  /**
   * @format string
   * @example "2"
   */
  id: string;
  attributes: Webhook;
  links: ObjectLink;
}

export interface WebhookSingle {
  data: WebhookRead;
}

export interface Account {
  /**
   * @format date-time
   * @example "2018-09-17T12:46:47+01:00"
   */
  created_at?: string;
  /**
   * @format date-time
   * @example "2018-09-17T12:46:47+01:00"
   */
  updated_at?: string;
  /**
   * If omitted, defaults to true.
   * @format boolean
   * @default true
   * @example false
   */
  active?: boolean;
  /**
   * Order of the account. Is NULL if account is not asset or liability.
   * @format int32
   * @example 1
   */
  order?: number | null;
  /**
   * @format string
   * @example "My checking account"
   */
  name: string;
  /** Can only be one one these account types. import, initial-balance and reconciliation cannot be set manually. */
  type: ShortAccountTypeProperty;
  /** Is only mandatory when the type is asset. */
  account_role?: AccountRoleProperty;
  /**
   * Use either currency_id or currency_code. Defaults to the user's default currency.
   * @format string
   * @example "12"
   */
  currency_id?: string;
  /**
   * Use either currency_id or currency_code. Defaults to the user's default currency.
   * @format string
   * @example "EUR"
   */
  currency_code?: string;
  /**
   * @format string
   * @example "$"
   */
  currency_symbol?: string;
  /**
   * @format int32
   * @example 2
   */
  currency_decimal_places?: number;
  /**
   * @format amount
   * @example "123.45"
   */
  current_balance?: string;
  /**
   * The timestamp for this date is always 23:59:59, to indicate it's the balance at the very END of that particular day.
   * @format date-time
   * @example "2018-09-17T12:46:47+01:00"
   */
  current_balance_date?: string;
  /**
   * @format iban
   * @example "GB98MIDL07009312345678"
   */
  iban?: string | null;
  /**
   * @format string
   * @example "BOFAUS3N"
   */
  bic?: string | null;
  /**
   * @format string
   * @example "7009312345678"
   */
  account_number?: string | null;
  /**
   * Represents the opening balance, the initial amount this account holds.
   * @format amount
   * @example "-1012.12"
   */
  opening_balance?: string;
  /**
   * Represents the current debt for liabilities.
   * @format amount
   * @example "1012.12"
   */
  current_debt?: string | null;
  /**
   * Represents the date of the opening balance.
   * @format date-time
   * @example "2018-09-17T12:46:47+01:00"
   */
  opening_balance_date?: string | null;
  /**
   * @format amount
   * @example "123.45"
   */
  virtual_balance?: string;
  /**
   * If omitted, defaults to true.
   * @format boolean
   * @default true
   * @example true
   */
  include_net_worth?: boolean;
  /** Mandatory when the account_role is ccAsset. Can only be monthlyFull or null. */
  credit_card_type?: CreditCardTypeProperty;
  /**
   * Mandatory when the account_role is ccAsset. Moment at which CC payment installments are asked for by the bank.
   * @format date-time
   * @example "2018-09-17T12:46:47+01:00"
   */
  monthly_payment_date?: string | null;
  /** Mandatory when type is liability. Specifies the exact type. */
  liability_type?: LiabilityTypeProperty;
  /** 'credit' indicates somebody owes you the liability. 'debit' Indicates you owe this debt yourself. Works only for liabiltiies. */
  liability_direction?: LiabilityDirectionProperty;
  /**
   * Mandatory when type is liability. Interest percentage.
   * @format string
   * @example "5.3"
   */
  interest?: string | null;
  /** Mandatory when type is liability. Period over which the interest is calculated. */
  interest_period?: InterestPeriodProperty;
  /**
   * @format string
   * @example "Some example notes"
   */
  notes?: string | null;
  /**
   * Latitude of the accounts's location, if applicable. Can be used to draw a map.
   * @format double
   * @example 51.983333
   */
  latitude?: number | null;
  /**
   * Latitude of the accounts's location, if applicable. Can be used to draw a map.
   * @format double
   * @example 5.916667
   */
  longitude?: number | null;
  /**
   * Zoom level for the map, if drawn. This to set the box right. Unfortunately this is a proprietary value because each map provider has different zoom levels.
   * @format int32
   * @example 6
   */
  zoom_level?: number | null;
}

export interface AccountStore {
  /**
   * @format string
   * @example "My checking account"
   */
  name: string;
  /** Can only be one one these account types. import, initial-balance and reconciliation cannot be set manually. */
  type: ShortAccountTypeProperty;
  /**
   * @format iban
   * @example "GB98MIDL07009312345678"
   */
  iban?: string | null;
  /**
   * @format string
   * @example "BOFAUS3N"
   */
  bic?: string | null;
  /**
   * @format string
   * @example "7009312345678"
   */
  account_number?: string | null;
  /**
   * Represents the opening balance, the initial amount this account holds.
   * @format amount
   * @example "-1012.12"
   */
  opening_balance?: string;
  /**
   * Represents the date of the opening balance.
   * @format date-time
   * @example "2018-09-17T12:46:47+01:00"
   */
  opening_balance_date?: string | null;
  /**
   * @format amount
   * @example "123.45"
   */
  virtual_balance?: string;
  /**
   * Use either currency_id or currency_code. Defaults to the user's default currency.
   * @format string
   * @example "12"
   */
  currency_id?: string;
  /**
   * Use either currency_id or currency_code. Defaults to the user's default currency.
   * @format string
   * @example "EUR"
   */
  currency_code?: string;
  /**
   * If omitted, defaults to true.
   * @format boolean
   * @default true
   * @example false
   */
  active?: boolean;
  /**
   * Order of the account
   * @format int32
   * @example 1
   */
  order?: number;
  /**
   * If omitted, defaults to true.
   * @format boolean
   * @default true
   * @example true
   */
  include_net_worth?: boolean;
  /** Is only mandatory when the type is asset. */
  account_role?: AccountRoleProperty;
  /** Mandatory when the account_role is ccAsset. Can only be monthlyFull or null. */
  credit_card_type?: CreditCardTypeProperty;
  /**
   * Mandatory when the account_role is ccAsset. Moment at which CC payment installments are asked for by the bank.
   * @format date-time
   * @example "2018-09-17T12:46:47+01:00"
   */
  monthly_payment_date?: string | null;
  /** Mandatory when type is liability. Specifies the exact type. */
  liability_type?: LiabilityTypeProperty;
  /** 'credit' indicates somebody owes you the liability. 'debit' Indicates you owe this debt yourself. Works only for liabiltiies. */
  liability_direction?: LiabilityDirectionProperty;
  /**
   * Mandatory when type is liability. Interest percentage.
   * @format string
   * @default "0"
   * @example "5.3"
   */
  interest?: string | null;
  /** Mandatory when type is liability. Period over which the interest is calculated. */
  interest_period?: InterestPeriodProperty;
  /**
   * @format string
   * @example "Some example notes"
   */
  notes?: string | null;
  /**
   * Latitude of the accounts's location, if applicable. Can be used to draw a map.
   * @format double
   * @example 51.983333
   */
  latitude?: number | null;
  /**
   * Latitude of the accounts's location, if applicable. Can be used to draw a map.
   * @format double
   * @example 5.916667
   */
  longitude?: number | null;
  /**
   * Zoom level for the map, if drawn. This to set the box right. Unfortunately this is a proprietary value because each map provider has different zoom levels.
   * @format int32
   * @example 6
   */
  zoom_level?: number | null;
}

export interface AccountUpdate {
  /**
   * @format string
   * @example "My checking account"
   */
  name: string;
  /**
   * @format iban
   * @example "GB98MIDL07009312345678"
   */
  iban?: string | null;
  /**
   * @format string
   * @example "BOFAUS3N"
   */
  bic?: string | null;
  /**
   * @format string
   * @example "7009312345678"
   */
  account_number?: string | null;
  /**
   * @format amount
   * @example "-1012.12"
   */
  opening_balance?: string;
  /**
   * @format date-time
   * @example "2018-09-17T12:46:47+01:00"
   */
  opening_balance_date?: string | null;
  /**
   * @format amount
   * @example "123.45"
   */
  virtual_balance?: string;
  /**
   * Use either currency_id or currency_code. Defaults to the user's default currency.
   * @format string
   * @example "12"
   */
  currency_id?: string;
  /**
   * Use either currency_id or currency_code. Defaults to the user's default currency.
   * @format string
   * @example "EUR"
   */
  currency_code?: string;
  /**
   * If omitted, defaults to true.
   * @format boolean
   * @default true
   * @example false
   */
  active?: boolean;
  /**
   * Order of the account
   * @format int32
   * @example 1
   */
  order?: number;
  /**
   * If omitted, defaults to true.
   * @format boolean
   * @default true
   * @example true
   */
  include_net_worth?: boolean;
  /** Is only mandatory when the type is asset. */
  account_role?: AccountRoleProperty;
  /** Mandatory when the account_role is ccAsset. Can only be monthlyFull or null. */
  credit_card_type?: CreditCardTypeProperty;
  /**
   * Mandatory when the account_role is ccAsset. Moment at which CC payment installments are asked for by the bank.
   * @format date-time
   * @example "2018-09-17T12:46:47+01:00"
   */
  monthly_payment_date?: string | null;
  /** Mandatory when type is liability. Specifies the exact type. */
  liability_type?: LiabilityTypeProperty;
  /**
   * Mandatory when type is liability. Interest percentage.
   * @format string
   * @example "5.3"
   */
  interest?: string | null;
  /** Mandatory when type is liability. Period over which the interest is calculated. */
  interest_period?: InterestPeriodProperty;
  /**
   * @format string
   * @example "Some example notes"
   */
  notes?: string | null;
  /**
   * Latitude of the account's location, if applicable. Can be used to draw a map. If omitted, the existing location will be kept. If submitted as NULL, the current location will be removed.
   * @format double
   * @example 51.983333
   */
  latitude?: number | null;
  /**
   * Latitude of the account's location, if applicable. Can be used to draw a map. If omitted, the existing location will be kept. If submitted as NULL, the current location will be removed.
   * @format double
   * @example 5.916667
   */
  longitude?: number | null;
  /**
   * Zoom level for the map, if drawn. This to set the box right. Unfortunately this is a proprietary value because each map provider has different zoom levels. If omitted, the existing location will be kept. If submitted as NULL, the current location will be removed.
   * @format int32
   * @example 6
   */
  zoom_level?: number | null;
}

export interface Attachment {
  /**
   * @format date-time
   * @example "2018-09-17T12:46:47+01:00"
   */
  created_at?: string;
  /**
   * @format date-time
   * @example "2018-09-17T12:46:47+01:00"
   */
  updated_at?: string;
  /** The object class to which the attachment must be linked. */
  attachable_type: AttachableType;
  /**
   * ID of the model this attachment is linked to.
   * @format string
   * @example "134"
   */
  attachable_id: string;
  /**
   * MD5 hash of the file for basic duplicate detection.
   * @format string
   * @example "0c3f95f34370baa88f9fd9a671fea305"
   */
  md5?: string;
  /**
   * @format string
   * @example "file.pdf"
   */
  filename: string;
  /**
   * @format string
   * @example "https://demo.firefly-iii.org/api/v1/attachments/191/download"
   */
  download_url?: string;
  /**
   * @format string
   * @example "https://demo.firefly-iii.org/api/v1/attachments/191/download"
   */
  upload_url?: string;
  /**
   * @format string
   * @example "Some PDF file"
   */
  title?: string | null;
  /**
   * @format string
   * @example "Some notes"
   */
  notes?: string | null;
  /**
   * @format string
   * @example "application/pdf"
   */
  mime?: string;
  /**
   * @format int32
   * @example 48211
   */
  size?: number;
}

export interface AttachmentStore {
  /**
   * @format string
   * @example "file.pdf"
   */
  filename: string;
  /** The object class to which the attachment must be linked. */
  attachable_type: AttachableType;
  /**
   * ID of the model this attachment is linked to.
   * @format string
   * @example "134"
   */
  attachable_id: string;
  /**
   * @format string
   * @example "Some PDF file"
   */
  title?: string;
  /**
   * @format string
   * @example "Some notes"
   */
  notes?: string | null;
}

export interface AttachmentUpdate {
  /**
   * @format string
   * @example "file.pdf"
   */
  filename?: string;
  /**
   * @format string
   * @example "Some PDF file"
   */
  title?: string;
  /**
   * @format string
   * @example "Some notes"
   */
  notes?: string | null;
}

export interface AvailableBudget {
  /**
   * @format date-time
   * @example "2018-09-17T12:46:47+01:00"
   */
  created_at?: string;
  /**
   * @format date-time
   * @example "2018-09-17T12:46:47+01:00"
   */
  updated_at?: string;
  /**
   * Use either currency_id or currency_code.
   * @format string
   * @example "5"
   */
  currency_id?: string;
  /**
   * Use either currency_id or currency_code.
   * @format string
   * @example "EUR"
   */
  currency_code?: string;
  /**
   * @format string
   * @example "$"
   */
  currency_symbol?: string;
  /**
   * @format int32
   * @example 2
   */
  currency_decimal_places?: number;
  /**
   * @format amount
   * @example "123.45"
   */
  amount: string;
  /**
   * Start date of the available budget.
   * @format date-time
   * @example "2018-09-17T12:46:47+01:00"
   */
  start: string;
  /**
   * End date of the available budget.
   * @format date-time
   * @example "2018-09-17T12:46:47+01:00"
   */
  end: string;
  spent_in_budgets?: BudgetSpent[];
  spent_outside_budget?: BudgetSpent[];
}

export interface Bill {
  /**
   * @format date-time
   * @example "2018-09-17T12:46:47+01:00"
   */
  created_at?: string;
  /**
   * @format date-time
   * @example "2018-09-17T12:46:47+01:00"
   */
  updated_at?: string;
  /**
   * Use either currency_id or currency_code
   * @format string
   * @example "5"
   */
  currency_id?: string;
  /**
   * Use either currency_id or currency_code
   * @format string
   * @example "EUR"
   */
  currency_code?: string;
  /**
   * @format string
   * @example "$"
   */
  currency_symbol?: string;
  /**
   * @format int32
   * @example 2
   */
  currency_decimal_places?: number;
  /**
   * @format string
   * @example "Rent"
   */
  name: string;
  /**
   * @format amount
   * @example "123.45"
   */
  amount_min: string;
  /**
   * @format amount
   * @example "123.45"
   */
  amount_max: string;
  /**
   * @format date-time
   * @example "2018-09-17T12:46:47+01:00"
   */
  date: string;
  /**
   * The date after which this bill is no longer valid or applicable
   * @format date-time
   * @example "2018-09-17T12:46:47+01:00"
   */
  end_date?: string | null;
  /**
   * The date before which the bill must be renewed (or cancelled)
   * @format date-time
   * @example "2018-09-17T12:46:47+01:00"
   */
  extension_date?: string | null;
  /** How often the bill must be paid. */
  repeat_freq: BillRepeatFrequency;
  /**
   * How often the bill must be skipped. 1 means a bi-monthly bill.
   * @format int32
   * @example 0
   */
  skip?: number;
  /**
   * If the bill is active.
   * @format boolean
   * @example true
   */
  active?: boolean;
  /**
   * Order of the bill.
   * @format int32
   * @example 1
   */
  order?: number;
  /**
   * @format string
   * @example "Some example notes"
   */
  notes?: string | null;
  /**
   * When the bill is expected to be due.
   * @format date-time
   * @example "2018-09-17T12:46:47+01:00"
   */
  next_expected_match?: string | null;
  /**
   * Formatted (locally) when the bill is due.
   * @format string
   * @example "today"
   */
  next_expected_match_diff?: string | null;
  /**
   * The group ID of the group this object is part of. NULL if no group.
   * @format string
   * @example "5"
   */
  object_group_id?: string | null;
  /**
   * The order of the group. At least 1, for the highest sorting.
   * @format int32
   * @example 5
   */
  object_group_order?: number | null;
  /**
   * The name of the group. NULL if no group.
   * @format string
   * @example "Example Group"
   */
  object_group_title?: string | null;
  /** Array of future dates when the bill is expected to be paid. Autogenerated. */
  pay_dates?: string[];
  /** Array of past transactions when the bill was paid. */
  paid_dates?: {
    /**
     * Transaction group ID of the paid bill.
     * @format string
     * @example "123"
     */
    transaction_group_id?: string;
    /**
     * Transaction journal ID of the paid bill.
     * @format string
     * @example "123"
     */
    transaction_journal_id?: string;
    /**
     * Date the bill was paid.
     * @format date-time
     * @example "2018-09-17T12:46:47+01:00"
     */
    date?: string;
  }[];
}

export interface BillStore {
  /**
   * Use either currency_id or currency_code
   * @format string
   * @example "5"
   */
  currency_id?: string;
  /**
   * Use either currency_id or currency_code
   * @format string
   * @example "EUR"
   */
  currency_code?: string;
  /**
   * @format string
   * @example "Rent"
   */
  name: string;
  /**
   * @format amount
   * @example "123.45"
   */
  amount_min: string;
  /**
   * @format amount
   * @example "123.45"
   */
  amount_max: string;
  /**
   * @format date-time
   * @example "2018-09-17T12:46:47+01:00"
   */
  date: string;
  /**
   * The date after which this bill is no longer valid or applicable
   * @format date-time
   * @example "2018-09-17T12:46:47+01:00"
   */
  end_date?: string;
  /**
   * The date before which the bill must be renewed (or cancelled)
   * @format date-time
   * @example "2018-09-17T12:46:47+01:00"
   */
  extension_date?: string;
  /** How often the bill must be paid. */
  repeat_freq: BillRepeatFrequency;
  /**
   * How often the bill must be skipped. 1 means a bi-monthly bill.
   * @format int32
   * @example 0
   */
  skip?: number;
  /**
   * If the bill is active.
   * @format boolean
   * @example true
   */
  active?: boolean;
  /**
   * @format string
   * @example "Some example notes"
   */
  notes?: string | null;
  /**
   * The group ID of the group this object is part of. NULL if no group.
   * @format string
   * @example "5"
   */
  object_group_id?: string | null;
  /**
   * The name of the group. NULL if no group.
   * @format string
   * @example "Example Group"
   */
  object_group_title?: string | null;
}

export interface BillUpdate {
  /**
   * Use either currency_id or currency_code
   * @format string
   * @example "5"
   */
  currency_id?: string;
  /**
   * Use either currency_id or currency_code
   * @format string
   * @example "EUR"
   */
  currency_code?: string;
  /**
   * @format string
   * @example "Rent"
   */
  name: string;
  /**
   * @format amount
   * @example "123.45"
   */
  amount_min?: string;
  /**
   * @format amount
   * @example "123.45"
   */
  amount_max?: string;
  /**
   * @format date-time
   * @example "2018-09-17T12:46:47+01:00"
   */
  date?: string;
  /**
   * The date after which this bill is no longer valid or applicable
   * @format date-time
   * @example "2018-09-17T12:46:47+01:00"
   */
  end_date?: string;
  /**
   * The date before which the bill must be renewed (or cancelled)
   * @format date-time
   * @example "2018-09-17T12:46:47+01:00"
   */
  extension_date?: string;
  /** How often the bill must be paid. */
  repeat_freq?: BillRepeatFrequency;
  /**
   * How often the bill must be skipped. 1 means a bi-monthly bill.
   * @format int32
   * @example 0
   */
  skip?: number;
  /**
   * If the bill is active.
   * @format boolean
   * @example true
   */
  active?: boolean;
  /**
   * @format string
   * @example "Some example notes"
   */
  notes?: string | null;
  /**
   * The group ID of the group this object is part of. NULL if no group.
   * @format string
   * @example "5"
   */
  object_group_id?: string | null;
  /**
   * The name of the group. NULL if no group.
   * @format string
   * @example "Example Group"
   */
  object_group_title?: string | null;
}

export interface Budget {
  /**
   * @format date-time
   * @example "2018-09-17T12:46:47+01:00"
   */
  created_at?: string;
  /**
   * @format date-time
   * @example "2018-09-17T12:46:47+01:00"
   */
  updated_at?: string;
  /**
   * @format string
   * @example "Bills"
   */
  name: string;
  /**
   * @format boolean
   * @example false
   */
  active?: boolean;
  /**
   * @format string
   * @example "Some notes"
   */
  notes?: string | null;
  /**
   * @format int32
   * @example 5
   */
  order?: number;
  /** The type of auto-budget that Firefly III must create. */
  auto_budget_type?: AutoBudgetType;
  /**
   * Use either currency_id or currency_code. Defaults to the user's default currency.
   * @format string
   * @example "12"
   */
  auto_budget_currency_id?: string | null;
  /**
   * Use either currency_id or currency_code. Defaults to the user's default currency.
   * @format string
   * @example "EUR"
   */
  auto_budget_currency_code?: string | null;
  /**
   * @format amount
   * @example "-1012.12"
   */
  auto_budget_amount?: string | null;
  /** Period for the auto budget */
  auto_budget_period?: AutoBudgetPeriod;
  /** Information on how much was spent in this budget. Is only filled in when the start and end date are submitted. */
  spent?: BudgetSpent[];
}

export interface BudgetStore {
  /**
   * @format string
   * @example "Bills"
   */
  name: string;
  /**
   * @format boolean
   * @example false
   */
  active?: boolean;
  /**
   * @format int32
   * @example 5
   */
  order?: number;
  /**
   * @format string
   * @example "Some notes"
   */
  notes?: string | null;
  /** The type of auto-budget that Firefly III must create. */
  auto_budget_type?: AutoBudgetType;
  /**
   * Use either currency_id or currency_code. Defaults to the user's default currency.
   * @format string
   * @example "12"
   */
  auto_budget_currency_id?: string | null;
  /**
   * Use either currency_id or currency_code. Defaults to the user's default currency.
   * @format string
   * @example "EUR"
   */
  auto_budget_currency_code?: string | null;
  /**
   * @format amount
   * @example "-1012.12"
   */
  auto_budget_amount?: string | null;
  /** Period for the auto budget */
  auto_budget_period?: AutoBudgetPeriod;
}

export interface BudgetUpdate {
  /**
   * @format string
   * @example "Bills"
   */
  name: string;
  /**
   * @format boolean
   * @example false
   */
  active?: boolean;
  /**
   * @format int32
   * @example 5
   */
  order?: number;
  /**
   * @format string
   * @example "Some notes"
   */
  notes?: string | null;
  /** The type of auto-budget that Firefly III must create. */
  auto_budget_type?: AutoBudgetType;
  /**
   * Use either currency_id or currency_code. Defaults to the user's default currency.
   * @format string
   * @example "12"
   */
  auto_budget_currency_id?: string | null;
  /**
   * Use either currency_id or currency_code. Defaults to the user's default currency.
   * @format string
   * @example "EUR"
   */
  auto_budget_currency_code?: string | null;
  /**
   * @format amount
   * @example "-1012.12"
   */
  auto_budget_amount?: string | null;
  /** Period for the auto budget */
  auto_budget_period?: AutoBudgetPeriod;
}

export interface BudgetLimit {
  /**
   * @format date-time
   * @example "2018-09-17T12:46:47+01:00"
   */
  created_at?: string;
  /**
   * @format date-time
   * @example "2018-09-17T12:46:47+01:00"
   */
  updated_at?: string;
  /**
   * Start date of the budget limit.
   * @format date-time
   * @example "2018-09-17T12:46:47+01:00"
   */
  start: string;
  /**
   * End date of the budget limit.
   * @format date-time
   * @example "2018-09-17T12:46:47+01:00"
   */
  end: string;
  /**
   * Use either currency_id or currency_code. Defaults to the user's default currency.
   * @format string
   * @example "5"
   */
  currency_id?: string;
  /**
   * Use either currency_id or currency_code. Defaults to the user's default currency.
   * @format string
   * @example "EUR"
   */
  currency_code?: string;
  /**
   * @format string
   * @example "Euro"
   */
  currency_name?: string;
  /**
   * @format string
   * @example "$"
   */
  currency_symbol?: string;
  /**
   * @format int32
   * @example 2
   */
  currency_decimal_places?: number;
  /**
   * The budget ID of the associated budget.
   * @format string
   * @example "23"
   */
  budget_id: string;
  /**
   * Period of the budget limit. Only used when auto-generated by auto-budget.
   * @format string
   * @example "monthly"
   */
  period?: string | null;
  /**
   * @format amount
   * @example "123.45"
   */
  amount: string;
  /**
   * @format amount
   * @example "-1012.12"
   */
  spent?: string | null;
}

export interface BudgetLimitStore {
  /**
   * Use either currency_id or currency_code. Defaults to the user's default currency.
   * @format string
   * @example "5"
   */
  currency_id?: string;
  /**
   * Use either currency_id or currency_code. Defaults to the user's default currency.
   * @format string
   * @example "EUR"
   */
  currency_code?: string;
  /**
   * The budget ID of the associated budget.
   * @format string
   * @example "23"
   */
  budget_id: string;
  /**
   * Start date of the budget limit.
   * @format date
   * @example "2017-09-17"
   */
  start: string;
  /**
   * Period of the budget limit. Only used when auto-generated by auto-budget.
   * @format string
   * @example "monthly"
   */
  period?: string | null;
  /**
   * End date of the budget limit.
   * @format date
   * @example "2017-09-17"
   */
  end: string;
  /**
   * @format amount
   * @example "123.45"
   */
  amount: string;
}

export interface BudgetSpent {
  /**
   * The amount spent.
   * @format amount
   * @example "123.45"
   */
  sum?: string;
  /**
   * @format string
   * @example "5"
   */
  currency_id?: string;
  /**
   * @format string
   * @example "USD"
   */
  currency_code?: string;
  /**
   * @format string
   * @example "$"
   */
  currency_symbol?: string;
  /**
   * Number of decimals supported by the currency
   * @format int32
   * @example 2
   */
  currency_decimal_places?: number;
}

export interface Category {
  /**
   * @format date-time
   * @example "2018-09-17T12:46:47+01:00"
   */
  created_at?: string;
  /**
   * @format date-time
   * @example "2018-09-17T12:46:47+01:00"
   */
  updated_at?: string;
  /**
   * @format string
   * @example "Lunch"
   */
  name: string;
  /**
   * @format string
   * @example "Some example notes"
   */
  notes?: string | null;
  spent?: CategorySpent[];
  earned?: CategoryEarned[];
}

export interface CategoryUpdate {
  /**
   * @format string
   * @example "Lunch"
   */
  name: string;
  /**
   * @format string
   * @example "Some example notes"
   */
  notes?: string | null;
}

export interface CategoryEarned {
  /**
   * @format string
   * @example "5"
   */
  currency_id?: string;
  /**
   * @format string
   * @example "USD"
   */
  currency_code?: string;
  /**
   * @format string
   * @example "$"
   */
  currency_symbol?: string;
  /**
   * Number of decimals supported by the currency
   * @format int32
   * @example 2
   */
  currency_decimal_places?: number;
  /**
   * The amount earned.
   * @format amount
   * @example "123.45"
   */
  sum?: string;
}

export interface CategorySpent {
  /**
   * @format string
   * @example "5"
   */
  currency_id?: string;
  /**
   * @format string
   * @example "USD"
   */
  currency_code?: string;
  /**
   * @format string
   * @example "$"
   */
  currency_symbol?: string;
  /**
   * Number of decimals supported by the currency
   * @format int32
   * @example 2
   */
  currency_decimal_places?: number;
  /**
   * The amount spent.
   * @format amount
   * @example "-12423.45"
   */
  sum?: string;
}

export interface ObjectGroup {
  /**
   * @format date-time
   * @example "2018-09-17T12:46:47+01:00"
   */
  created_at?: string;
  /**
   * @format date-time
   * @example "2018-09-17T12:46:47+01:00"
   */
  updated_at?: string;
  /**
   * @format string
   * @example "My object group"
   */
  title: string;
  /**
   * Order of the object group
   * @format int32
   * @example 1
   */
  order: number;
}

export interface ObjectGroupUpdate {
  /**
   * @format string
   * @example "My object group"
   */
  title: string;
  /**
   * Order of the object group
   * @format int32
   * @example 1
   */
  order?: number;
}

export interface ObjectLink {
  '0'?: {
    /**
     * @format string
     * @example "self"
     */
    rel?: string;
    /**
     * @format string
     * @example "/OBJECTS/1"
     */
    uri?: string;
  };
  /**
   * @format uri
   * @example "https://demo.firefly-iii.org/api/v1/OBJECTS/1"
   */
  self?: string;
}

export interface PageLink {
  /**
   * @format uri
   * @example "https://demo.firefly-iii.org/api/v1/OBJECT?&page=4"
   */
  self?: string;
  /**
   * @format uri
   * @example "https://demo.firefly-iii.org/api/v1/OBJECT?&page=1"
   */
  first?: string;
  /**
   * @format uri
   * @example "https://demo.firefly-iii.org/api/v1/OBJECT?&page=3"
   */
  next?: string | null;
  /**
   * @format uri
   * @example "https://demo.firefly-iii.org/api/v1/OBJECT?&page=2"
   */
  prev?: string | null;
  /**
   * @format uri
   * @example "https://demo.firefly-iii.org/api/v1/OBJECT?&page=12"
   */
  last?: string;
}

export interface PiggyBank {
  /**
   * @format date-time
   * @example "2018-09-17T12:46:47+01:00"
   */
  created_at?: string;
  /**
   * @format date-time
   * @example "2018-09-17T12:46:47+01:00"
   */
  updated_at?: string;
  /**
   * The ID of the asset account this piggy bank is connected to.
   * @format string
   * @example 13
   */
  account_id: string;
  /**
   * The name of the asset account this piggy bank is connected to.
   * @format string
   * @example "Savings account"
   */
  account_name?: string;
  /**
   * @format string
   * @example "New digital camera"
   */
  name: string;
  /**
   * @format string
   * @example "5"
   */
  currency_id?: string;
  /**
   * @format string
   * @example "USD"
   */
  currency_code?: string;
  /**
   * @format string
   * @example "$"
   */
  currency_symbol?: string;
  /**
   * Number of decimals supported by the currency
   * @format int32
   * @example 2
   */
  currency_decimal_places?: number;
  /**
   * @format amount
   * @example "123.45"
   */
  target_amount: string | null;
  /**
   * @format float
   * @example 12.5
   */
  percentage?: number | null;
  /**
   * @format amount
   * @example "123.45"
   */
  current_amount?: string;
  /**
   * @format string
   * @example "700.00"
   */
  left_to_save?: string | null;
  /**
   * @format string
   * @example "12.45"
   */
  save_per_month?: string | null;
  /**
   * The date you started with this piggy bank.
   * @format date
   * @example "2018-09-17"
   */
  start_date?: string;
  /**
   * The date you intend to finish saving money.
   * @format date
   * @example "2018-09-17"
   */
  target_date?: string | null;
  /**
   * @format int32
   * @example 5
   */
  order?: number;
  /**
   * @format boolean
   * @example true
   */
  active?: boolean;
  /**
   * @format string
   * @example "Some notes"
   */
  notes?: string | null;
  /**
   * The group ID of the group this object is part of. NULL if no group.
   * @format string
   * @example "5"
   */
  object_group_id?: string | null;
  /**
   * The order of the group. At least 1, for the highest sorting.
   * @format int32
   * @example 5
   */
  object_group_order?: number | null;
  /**
   * The name of the group. NULL if no group.
   * @format string
   * @example "Example Group"
   */
  object_group_title?: string | null;
}

export interface PiggyBankStore {
  /**
   * @format string
   * @example "New digital camera"
   */
  name: string;
  /**
   * The ID of the asset account this piggy bank is connected to.
   * @format string
   * @example 13
   */
  account_id: string;
  /**
   * @format amount
   * @example "123.45"
   */
  target_amount: string | null;
  /**
   * @format amount
   * @example "123.45"
   */
  current_amount?: string;
  /**
   * The date you started with this piggy bank.
   * @format date
   * @example "2018-09-17"
   */
  start_date?: string;
  /**
   * The date you intend to finish saving money.
   * @format date
   * @example "2018-09-17"
   */
  target_date?: string | null;
  /**
   * @format int32
   * @example 5
   */
  order?: number;
  /**
   * @format boolean
   * @example true
   */
  active?: boolean;
  /**
   * @format string
   * @example "Some notes"
   */
  notes?: string | null;
  /**
   * The group ID of the group this object is part of. NULL if no group.
   * @format string
   * @example "5"
   */
  object_group_id?: string | null;
  /**
   * The name of the group. NULL if no group.
   * @format string
   * @example "Example Group"
   */
  object_group_title?: string | null;
}

export interface PiggyBankUpdate {
  /**
   * @format string
   * @example "New digital camera"
   */
  name?: string;
  /**
   * The ID of the asset account this piggy bank is connected to.
   * @format string
   * @example 13
   */
  account_id?: string;
  /**
   * @format string
   * @example "5"
   */
  currency_id?: string;
  /**
   * @format string
   * @example "USD"
   */
  currency_code?: string;
  /**
   * @format amount
   * @example "123.45"
   */
  target_amount?: string | null;
  /**
   * @format amount
   * @example "123.45"
   */
  current_amount?: string;
  /**
   * The date you started with this piggy bank.
   * @format date
   * @example "2018-09-17"
   */
  start_date?: string;
  /**
   * The date you intend to finish saving money.
   * @format date
   * @example "2018-09-17"
   */
  target_date?: string | null;
  /**
   * @format int32
   * @example 5
   */
  order?: number;
  /**
   * @format boolean
   * @example true
   */
  active?: boolean;
  /**
   * @format string
   * @example "Some notes"
   */
  notes?: string | null;
  /**
   * The group ID of the group this object is part of. NULL if no group.
   * @format string
   * @example "5"
   */
  object_group_id?: string | null;
  /**
   * The name of the group. NULL if no group.
   * @format string
   * @example "Example Group"
   */
  object_group_title?: string | null;
}

export interface PiggyBankEvent {
  /**
   * @format date-time
   * @example "2018-09-17T12:46:47+01:00"
   */
  created_at?: string;
  /**
   * @format date-time
   * @example "2018-09-17T12:46:47+01:00"
   */
  updated_at?: string;
  /**
   * @format string
   * @example "5"
   */
  currency_id?: string;
  /**
   * @format string
   * @example "EUR"
   */
  currency_code?: string;
  /**
   * @format string
   * @example "$"
   */
  currency_symbol?: string;
  /**
   * @format int32
   * @example 2
   */
  currency_decimal_places?: number;
  /**
   * @format amount
   * @example "123.45"
   */
  amount?: string;
  /**
   * The journal associated with the event.
   * @format string
   * @example "4291"
   */
  transaction_journal_id?: string | null;
  /**
   * The transaction group associated with the event.
   * @format string
   * @example "4291"
   */
  transaction_group_id?: string | null;
}

export interface Preference {
  /**
   * @format date-time
   * @example "2018-09-17T12:46:47+01:00"
   */
  created_at?: string;
  /**
   * @format date-time
   * @example "2018-09-17T12:46:47+01:00"
   */
  updated_at?: string;
  /**
   * @format string
   * @example "currencyPreference"
   */
  name: string;
  data: PolymorphicProperty;
}

export interface PreferenceUpdate {
  data: PolymorphicProperty;
}

export interface Recurrence {
  /**
   * @format date-time
   * @example "2018-09-17T12:46:47+01:00"
   */
  created_at?: string;
  /**
   * @format date-time
   * @example "2018-09-17T12:46:47+01:00"
   */
  updated_at?: string;
  type?: RecurrenceTransactionType;
  /**
   * @format string
   * @example "Rent"
   */
  title?: string;
  /**
   * Not to be confused with the description of the actual transaction(s) being created.
   * @format string
   * @example "Recurring transaction for the monthly rent"
   */
  description?: string;
  /**
   * First time the recurring transaction will fire. Must be after today.
   * @format date
   * @example "2018-09-17"
   */
  first_date?: string;
  /**
   * Last time the recurring transaction has fired.
   * @format date
   * @example "2018-09-17"
   */
  latest_date?: string | null;
  /**
   * Date until the recurring transaction can fire. Use either this field or repetitions.
   * @format date
   * @example "2018-09-17"
   */
  repeat_until?: string | null;
  /**
   * Max number of created transactions. Use either this field or repeat_until.
   * @format int32
   * @example 5
   */
  nr_of_repetitions?: number | null;
  /**
   * Whether or not to fire the rules after the creation of a transaction.
   * @format boolean
   * @example true
   */
  apply_rules?: boolean;
  /**
   * If the recurrence is even active.
   * @format boolean
   * @example true
   */
  active?: boolean;
  /**
   * @format string
   * @example "Some notes"
   */
  notes?: string | null;
  repetitions?: RecurrenceRepetition[];
  transactions?: RecurrenceTransaction[];
}

export interface RecurrenceStore {
  type: RecurrenceTransactionType;
  /**
   * @format string
   * @example "Rent"
   */
  title: string;
  /**
   * Not to be confused with the description of the actual transaction(s) being created.
   * @format string
   * @example "Recurring transaction for the monthly rent"
   */
  description?: string;
  /**
   * First time the recurring transaction will fire. Must be after today.
   * @format date
   * @example "2018-09-17"
   */
  first_date: string;
  /**
   * Date until the recurring transaction can fire. Use either this field or repetitions.
   * @format date
   * @example "2018-09-17"
   */
  repeat_until: string | null;
  /**
   * Max number of created transactions. Use either this field or repeat_until.
   * @format int32
   * @example 5
   */
  nr_of_repetitions?: number | null;
  /**
   * Whether or not to fire the rules after the creation of a transaction.
   * @format boolean
   * @example true
   */
  apply_rules?: boolean;
  /**
   * If the recurrence is even active.
   * @format boolean
   * @example true
   */
  active?: boolean;
  /**
   * @format string
   * @example "Some notes"
   */
  notes?: string | null;
  repetitions: RecurrenceRepetitionStore[];
  transactions: RecurrenceTransactionStore[];
}

export interface RecurrenceUpdate {
  /**
   * @format string
   * @example "Rent"
   */
  title?: string;
  /**
   * Not to be confused with the description of the actual transaction(s) being created.
   * @format string
   * @example "Recurring transaction for the monthly rent"
   */
  description?: string;
  /**
   * First time the recurring transaction will fire.
   * @format date
   * @example "2018-09-17"
   */
  first_date?: string;
  /**
   * Date until the recurring transaction can fire. After that date, it's basically inactive. Use either this field or repetitions.
   * @format date
   * @example "2018-09-17"
   */
  repeat_until?: string | null;
  /**
   * Max number of created transactions. Use either this field or repeat_until.
   * @format int32
   * @example 5
   */
  nr_of_repetitions?: number | null;
  /**
   * Whether or not to fire the rules after the creation of a transaction.
   * @format boolean
   * @example true
   */
  apply_rules?: boolean;
  /**
   * If the recurrence is even active.
   * @format boolean
   * @example true
   */
  active?: boolean;
  /**
   * @format string
   * @example "Some notes"
   */
  notes?: string | null;
  repetitions?: RecurrenceRepetitionUpdate[];
  transactions?: RecurrenceTransactionUpdate[];
}

export interface RecurrenceRepetition {
  /**
   * @format string
   * @example "2"
   */
  id?: string;
  /**
   * @format date-time
   * @example "2018-09-17T12:46:47+01:00"
   */
  created_at?: string;
  /**
   * @format date-time
   * @example "2018-09-17T12:46:47+01:00"
   */
  updated_at?: string;
  /** The type of the repetition. ndom means: the n-th weekday of the month, where you can also specify which day of the week. */
  type: RecurrenceRepetitionType;
  /**
   * Information that defined the type of repetition.
   * - For 'daily', this is empty.
   * - For 'weekly', it is day of the week between 1 and 7 (Monday - Sunday).
   * - For 'ndom', it is '1,2' or '4,5' or something else, where the first number is the week in the month, and the second number is the day in the week (between 1 and 7). '2,3' means: the 2nd Wednesday of the month
   * - For 'monthly' it is the day of the month (1 - 31)
   * - For yearly, it is a full date, ie '2018-09-17'. The year you use does not matter.
   * @format string
   * @example "3"
   */
  moment: string;
  /**
   * How many occurrences to skip. 0 means skip nothing. 1 means every other.
   * @format int32
   * @example 0
   */
  skip?: number;
  /**
   * How to respond when the recurring transaction falls in the weekend. Possible values:
   * 1. Do nothing, just create it
   * 2. Create no transaction.
   * 3. Skip to the previous Friday.
   * 4. Skip to the next Monday.
   * @format int32
   * @example 1
   */
  weekend?: number;
  /**
   * Auto-generated repetition description.
   * @format string
   * @example "Every week on Friday"
   */
  description?: string;
  /** Array of future dates when the repetition will apply to. Auto generated. */
  occurrences?: string[];
}

export interface RecurrenceRepetitionStore {
  /** The type of the repetition. ndom means: the n-th weekday of the month, where you can also specify which day of the week. */
  type: RecurrenceRepetitionType;
  /**
   * Information that defined the type of repetition.
   * - For 'daily', this is empty.
   * - For 'weekly', it is day of the week between 1 and 7 (Monday - Sunday).
   * - For 'ndom', it is '1,2' or '4,5' or something else, where the first number is the week in the month, and the second number is the day in the week (between 1 and 7). '2,3' means: the 2nd Wednesday of the month
   * - For 'monthly' it is the day of the month (1 - 31)
   * - For yearly, it is a full date, ie '2018-09-17'. The year you use does not matter.
   * @format string
   * @example "3"
   */
  moment: string;
  /**
   * How many occurrences to skip. 0 means skip nothing. 1 means every other.
   * @format int32
   * @example 0
   */
  skip?: number;
  /**
   * How to respond when the recurring transaction falls in the weekend. Possible values:
   * 1. Do nothing, just create it
   * 2. Create no transaction.
   * 3. Skip to the previous Friday.
   * 4. Skip to the next Monday.
   * @format int32
   * @example 1
   */
  weekend?: number;
}

export interface RecurrenceRepetitionUpdate {
  /** The type of the repetition. ndom means: the n-th weekday of the month, where you can also specify which day of the week. */
  type?: RecurrenceRepetitionType;
  /**
   * Information that defined the type of repetition.
   * - For 'daily', this is empty.
   * - For 'weekly', it is day of the week between 1 and 7 (Monday - Sunday).
   * - For 'ndom', it is '1,2' or '4,5' or something else, where the first number is the week in the month, and the second number is the day in the week (between 1 and 7). '2,3' means: the 2nd Wednesday of the month
   * - For 'monthly' it is the day of the month (1 - 31)
   * - For yearly, it is a full date, ie '2018-09-17'. The year you use does not matter.
   * @format string
   * @example "3"
   */
  moment?: string;
  /**
   * How many occurrences to skip. 0 means skip nothing. 1 means every other.
   * @format int32
   * @example 0
   */
  skip?: number;
  /**
   * How to respond when the recurring transaction falls in the weekend. Possible values:
   * 1. Do nothing, just create it
   * 2. Create no transaction.
   * 3. Skip to the previous Friday.
   * 4. Skip to the next Monday.
   * @format int32
   * @example 1
   */
  weekend?: number;
}

export interface RecurrenceTransaction {
  /**
   * @format string
   * @example "ID of the recurring transaction. Not to be confused with the ID of the recurrence itself."
   */
  id?: string;
  /**
   * @format string
   * @example "Rent for the current month"
   */
  description: string;
  /**
   * Amount of the transaction.
   * @format amount
   * @example "123.45"
   */
  amount: string;
  /**
   * Foreign amount of the transaction.
   * @format amount
   * @example "123.45"
   */
  foreign_amount?: string | null;
  /**
   * Submit either a currency_id or a currency_code.
   * @format string
   * @example "3"
   */
  currency_id?: string;
  /**
   * Submit either a currency_id or a currency_code.
   * @format string
   * @example "EUR"
   */
  currency_code?: string;
  /**
   * @format string
   * @example "€"
   */
  currency_symbol?: string;
  /**
   * Number of decimals in the currency
   * @format int32
   * @example 2
   */
  currency_decimal_places?: number;
  /**
   * Submit either a foreign_currency_id or a foreign_currency_code, or neither.
   * @format string
   * @example "17"
   */
  foreign_currency_id?: string | null;
  /**
   * Submit either a foreign_currency_id or a foreign_currency_code, or neither.
   * @format string
   * @example "GBP"
   */
  foreign_currency_code?: string | null;
  /**
   * @format string
   * @example "$"
   */
  foreign_currency_symbol?: string | null;
  /**
   * Number of decimals in the currency
   * @format int32
   * @example 2
   */
  foreign_currency_decimal_places?: number | null;
  /**
   * The budget ID for this transaction.
   * @format string
   * @example "4"
   */
  budget_id?: string;
  /**
   * The name of the budget to be used. If the budget name is unknown, the ID will be used or the value will be ignored.
   * @format string
   * @example "Groceries"
   */
  budget_name?: string | null;
  /**
   * Category ID for this transaction.
   * @format string
   * @example "211"
   */
  category_id?: string;
  /**
   * Category name for this transaction.
   * @format string
   * @example "Bills"
   */
  category_name?: string;
  /**
   * ID of the source account. Submit either this or source_name.
   * @format string
   * @example "913"
   */
  source_id?: string;
  /**
   * Name of the source account. Submit either this or source_id.
   * @format string
   * @example "Checking account"
   */
  source_name?: string;
  /**
   * @format string
   * @example "NL02ABNA0123456789"
   */
  source_iban?: string | null;
  source_type?: AccountTypeProperty;
  /**
   * ID of the destination account. Submit either this or destination_name.
   * @format string
   * @example "258"
   */
  destination_id?: string;
  /**
   * Name of the destination account. Submit either this or destination_id.
   * @format string
   * @example "Buy and Large"
   */
  destination_name?: string;
  /**
   * @format string
   * @example "NL02ABNA0123456789"
   */
  destination_iban?: string | null;
  destination_type?: AccountTypeProperty;
  /**
   * Array of tags.
   * @example null
   */
  tags?: string[] | null;
  /**
   * Optional. Use either this or the piggy_bank_name
   * @format string
   * @example "123"
   */
  piggy_bank_id?: string | null;
  /**
   * Optional. Use either this or the piggy_bank_id
   * @format string
   */
  piggy_bank_name?: string | null;
  /**
   * Optional. Use either this or the bill_name
   * @format string
   * @example "123"
   */
  bill_id?: string | null;
  /**
   * Optional. Use either this or the bill_id
   * @format string
   */
  bill_name?: string | null;
}

export interface RecurrenceTransactionStore {
  /**
   * @format string
   * @example "Rent for the current month"
   */
  description: string;
  /**
   * Amount of the transaction.
   * @format amount
   * @example "123.45"
   */
  amount: string;
  /**
   * Foreign amount of the transaction.
   * @format amount
   * @example "123.45"
   */
  foreign_amount?: string | null;
  /**
   * Submit either a currency_id or a currency_code.
   * @format string
   * @example "3"
   */
  currency_id?: string;
  /**
   * Submit either a currency_id or a currency_code.
   * @format string
   * @example "EUR"
   */
  currency_code?: string;
  /**
   * Submit either a foreign_currency_id or a foreign_currency_code, or neither.
   * @format string
   * @example "17"
   */
  foreign_currency_id?: string | null;
  /**
   * Submit either a foreign_currency_id or a foreign_currency_code, or neither.
   * @format string
   * @example "GBP"
   */
  foreign_currency_code?: string | null;
  /**
   * The budget ID for this transaction.
   * @format string
   * @example "4"
   */
  budget_id?: string;
  /**
   * Category ID for this transaction.
   * @format string
   * @example "211"
   */
  category_id?: string;
  /**
   * ID of the source account.
   * @format string
   * @example "913"
   */
  source_id: string;
  /**
   * ID of the destination account.
   * @format string
   * @example "258"
   */
  destination_id: string;
  /**
   * Array of tags.
   * @example null
   */
  tags?: string[] | null;
  /**
   * Optional.
   * @format string
   * @example "123"
   */
  piggy_bank_id?: string | null;
  /**
   * Optional.
   * @format string
   * @example "123"
   */
  bill_id?: string | null;
}

export interface RecurrenceTransactionUpdate {
  /**
   * @format string
   * @example "ID of the recurring transaction. Not to be confused with the ID of the recurrence itself. Is marked as REQUIRED but can be skipped when there is only ONE transaction."
   */
  id: string;
  /**
   * @format string
   * @example "Rent for the current month"
   */
  description?: string;
  /**
   * Amount of the transaction.
   * @format amount
   * @example "123.45"
   */
  amount?: string;
  /**
   * Foreign amount of the transaction.
   * @format amount
   * @example "123.45"
   */
  foreign_amount?: string | null;
  /**
   * Submit either a currency_id or a currency_code.
   * @format string
   * @example "3"
   */
  currency_id?: string;
  /**
   * Submit either a currency_id or a currency_code.
   * @format string
   * @example "EUR"
   */
  currency_code?: string;
  /**
   * Submit either a foreign_currency_id or a foreign_currency_code, or neither.
   * @format string
   * @example "17"
   */
  foreign_currency_id?: string | null;
  /**
   * The budget ID for this transaction.
   * @format string
   * @example "4"
   */
  budget_id?: string;
  /**
   * Category ID for this transaction.
   * @format string
   * @example "211"
   */
  category_id?: string;
  /**
   * ID of the source account. Submit either this or source_name.
   * @format string
   * @example "913"
   */
  source_id?: string;
  /**
   * ID of the destination account. Submit either this or destination_name.
   * @format string
   * @example "258"
   */
  destination_id?: string;
  /**
   * Array of tags.
   * @example null
   */
  tags?: string[] | null;
  /**
   * @format string
   * @example "123"
   */
  piggy_bank_id?: string | null;
  /**
   * Optional.
   * @format string
   * @example "123"
   */
  bill_id?: string | null;
}

export interface Rule {
  /**
   * @format date-time
   * @example "2018-09-17T12:46:47+01:00"
   */
  created_at?: string;
  /**
   * @format date-time
   * @example "2018-09-17T12:46:47+01:00"
   */
  updated_at?: string;
  /**
   * @format string
   * @example "First rule title."
   */
  title: string;
  /**
   * @format string
   * @example "First rule description"
   */
  description?: string;
  /**
   * ID of the rule group under which the rule must be stored. Either this field or rule_group_title is mandatory.
   * @format string
   * @example "81"
   */
  rule_group_id: string;
  /**
   * Title of the rule group under which the rule must be stored. Either this field or rule_group_id is mandatory.
   * @format string
   * @example "New rule group"
   */
  rule_group_title?: string;
  /**
   * @format int32
   * @example 5
   */
  order?: number;
  /** Which action is necessary for the rule to fire? Use either store-journal or update-journal. */
  trigger: RuleTriggerType;
  /**
   * Whether or not the rule is even active. Default is true.
   * @format boolean
   * @default true
   * @example true
   */
  active?: boolean;
  /**
   * If the rule is set to be strict, ALL triggers must hit in order for the rule to fire. Otherwise, just one is enough. Default value is true.
   * @format boolean
   * @example true
   */
  strict?: boolean;
  /**
   * If this value is true and the rule is triggered, other rules  after this one in the group will be skipped. Default value is false.
   * @format boolean
   * @default false
   * @example false
   */
  stop_processing?: boolean;
  triggers: RuleTrigger[];
  actions: RuleAction[];
}

export interface RuleStore {
  /**
   * @format string
   * @example "First rule title."
   */
  title: string;
  /**
   * @format string
   * @example "First rule description"
   */
  description?: string;
  /**
   * ID of the rule group under which the rule must be stored. Either this field or rule_group_title is mandatory.
   * @format string
   * @example "81"
   */
  rule_group_id: string;
  /**
   * Title of the rule group under which the rule must be stored. Either this field or rule_group_id is mandatory.
   * @format string
   * @example "New rule group"
   */
  rule_group_title?: string;
  /**
   * @format int32
   * @example 5
   */
  order?: number;
  /** Which action is necessary for the rule to fire? Use either store-journal or update-journal. */
  trigger: RuleTriggerType;
  /**
   * Whether or not the rule is even active. Default is true.
   * @format boolean
   * @default true
   * @example true
   */
  active?: boolean;
  /**
   * If the rule is set to be strict, ALL triggers must hit in order for the rule to fire. Otherwise, just one is enough. Default value is true.
   * @format boolean
   * @default true
   * @example true
   */
  strict?: boolean;
  /**
   * If this value is true and the rule is triggered, other rules  after this one in the group will be skipped. Default value is false.
   * @format boolean
   * @example false
   */
  stop_processing?: boolean;
  triggers: RuleTriggerStore[];
  actions: RuleActionStore[];
}

export interface RuleUpdate {
  /**
   * @format string
   * @example "First rule title."
   */
  title?: string;
  /**
   * @format string
   * @example "First rule description"
   */
  description?: string;
  /**
   * ID of the rule group under which the rule must be stored. Either this field or rule_group_title is mandatory.
   * @format string
   * @example "81"
   */
  rule_group_id?: string;
  /**
   * @format int32
   * @example 5
   */
  order?: number;
  /** Which action is necessary for the rule to fire? Use either store-journal or update-journal. */
  trigger?: RuleTriggerType;
  /**
   * Whether or not the rule is even active. Default is true.
   * @format boolean
   * @default true
   * @example true
   */
  active?: boolean;
  /**
   * If the rule is set to be strict, ALL triggers must hit in order for the rule to fire. Otherwise, just one is enough. Default value is true.
   * @format boolean
   * @example true
   */
  strict?: boolean;
  /**
   * If this value is true and the rule is triggered, other rules  after this one in the group will be skipped. Default value is false.
   * @format boolean
   * @default false
   * @example false
   */
  stop_processing?: boolean;
  triggers?: RuleTriggerUpdate[];
  actions?: RuleActionUpdate[];
}

export interface RuleAction {
  /**
   * @format string
   * @example "2"
   */
  id?: string;
  /**
   * @format date-time
   * @example "2018-09-17T12:46:47+01:00"
   */
  created_at?: string;
  /**
   * @format date-time
   * @example "2018-09-17T12:46:47+01:00"
   */
  updated_at?: string;
  /** The type of thing this action will do. A limited set is possible. */
  type: RuleActionKeyword;
  /**
   * The accompanying value the action will set, change or update. Can be empty, but for some types this value is mandatory.
   * @format string
   * @example "Daily groceries"
   */
  value: string | null;
  /**
   * Order of the action
   * @format int32
   * @example 5
   */
  order?: number;
  /**
   * If the action is active. Defaults to true.
   * @format boolean
   * @default true
   * @example true
   */
  active?: boolean;
  /**
   * When true, other actions will not be fired after this action has fired. Defaults to false.
   * @format boolean
   * @default false
   * @example false
   */
  stop_processing?: boolean;
}

export interface RuleActionStore {
  /** The type of thing this action will do. A limited set is possible. */
  type: RuleActionKeyword;
  /**
   * The accompanying value the action will set, change or update. Can be empty, but for some types this value is mandatory.
   * @format string
   * @example "Daily groceries"
   */
  value: string | null;
  /**
   * Order of the action
   * @format int32
   * @example 5
   */
  order?: number;
  /**
   * If the action is active. Defaults to true.
   * @format boolean
   * @default true
   * @example true
   */
  active?: boolean;
  /**
   * When true, other actions will not be fired after this action has fired. Defaults to false.
   * @format boolean
   * @default false
   * @example false
   */
  stop_processing?: boolean;
}

export interface RuleActionUpdate {
  /** The type of thing this action will do. A limited set is possible. */
  type?: RuleActionKeyword;
  /**
   * The accompanying value the action will set, change or update. Can be empty, but for some types this value is mandatory.
   * @format string
   * @example "Daily groceries"
   */
  value?: string | null;
  /**
   * Order of the action
   * @format int32
   * @example 5
   */
  order?: number;
  /**
   * If the action is active.
   * @format boolean
   * @example true
   */
  active?: boolean;
  /**
   * When true, other actions will not be fired after this action has fired.
   * @format boolean
   * @example false
   */
  stop_processing?: boolean;
}

export interface RuleGroup {
  /**
   * @format date-time
   * @example "2018-09-17T12:46:47+01:00"
   */
  created_at?: string;
  /**
   * @format date-time
   * @example "2018-09-17T12:46:47+01:00"
   */
  updated_at?: string;
  /**
   * @format string
   * @example "Default rule group"
   */
  title: string;
  /**
   * @format string
   * @example "Description of this rule group"
   */
  description?: string | null;
  /**
   * @format int32
   * @example 4
   */
  order?: number;
  /**
   * @format boolean
   * @example true
   */
  active?: boolean;
}

export interface RuleGroupStore {
  /**
   * @format string
   * @example "Default rule group"
   */
  title: string;
  /**
   * @format string
   * @example "Description of this rule group"
   */
  description?: string | null;
  /**
   * @format int32
   * @example 4
   */
  order?: number;
  /**
   * @format boolean
   * @example true
   */
  active?: boolean;
}

export interface RuleGroupUpdate {
  /**
   * @format string
   * @example "Default rule group"
   */
  title?: string;
  /**
   * @format string
   * @example "Description of this rule group"
   */
  description?: string | null;
  /**
   * @format int32
   * @example 4
   */
  order?: number;
  /**
   * @format boolean
   * @example true
   */
  active?: boolean;
}

export interface RuleTrigger {
  /**
   * @format string
   * @example "2"
   */
  id?: string;
  /**
   * @format date-time
   * @example "2018-09-17T12:46:47+01:00"
   */
  created_at?: string;
  /**
   * @format date-time
   * @example "2018-09-17T12:46:47+01:00"
   */
  updated_at?: string;
  /** The type of thing this trigger responds to. A limited set is possible */
  type: RuleTriggerKeyword;
  /**
   * The accompanying value the trigger responds to. This value is often mandatory, but this depends on the trigger.
   * @format string
   * @example "tag1"
   */
  value: string;
  /**
   * If 'prohibited' is true, this rule trigger will be negated. 'Description is' will become 'Description is NOT' etc.
   * @format boolean
   * @default false
   * @example false
   */
  prohibited?: boolean;
  /**
   * Order of the trigger
   * @format int32
   * @example 5
   */
  order?: number;
  /**
   * If the trigger is active. Defaults to true.
   * @format boolean
   * @default true
   * @example true
   */
  active?: boolean;
  /**
   * When true, other triggers will not be checked if this trigger was triggered. Defaults to false.
   * @format boolean
   * @default false
   * @example false
   */
  stop_processing?: boolean;
}

export interface RuleTriggerStore {
  /** The type of thing this trigger responds to. A limited set is possible */
  type: RuleTriggerKeyword;
  /**
   * The accompanying value the trigger responds to. This value is often mandatory, but this depends on the trigger.
   * @format string
   * @example "tag1"
   */
  value: string;
  /**
   * Order of the trigger
   * @format int32
   * @example 5
   */
  order?: number;
  /**
   * If the trigger is active. Defaults to true.
   * @format boolean
   * @default true
   * @example true
   */
  active?: boolean;
  /**
   * If 'prohibited' is true, this rule trigger will be negated. 'Description is' will become 'Description is NOT' etc.
   * @format boolean
   * @default false
   * @example false
   */
  prohibited?: boolean;
  /**
   * When true, other triggers will not be checked if this trigger was triggered. Defaults to false.
   * @format boolean
   * @default false
   * @example false
   */
  stop_processing?: boolean;
}

export interface RuleTriggerUpdate {
  /** The type of thing this trigger responds to. A limited set is possible */
  type?: RuleTriggerKeyword;
  /**
   * The accompanying value the trigger responds to. This value is often mandatory, but this depends on the trigger. If the rule trigger is something like 'has any tag', submit the string 'true'.
   * @format string
   * @example "tag1"
   */
  value?: string;
  /**
   * Order of the trigger
   * @format int32
   * @example 5
   */
  order?: number;
  /**
   * If the trigger is active.
   * @format boolean
   * @example true
   */
  active?: boolean;
  /**
   * When true, other triggers will not be checked if this trigger was triggered.
   * @format boolean
   * @example false
   */
  stop_processing?: boolean;
}

/** A single tag */
export interface TagModel {
  /**
   * @format date-time
   * @example "2018-09-17T12:46:47+01:00"
   */
  created_at?: string;
  /**
   * @format date-time
   * @example "2018-09-17T12:46:47+01:00"
   */
  updated_at?: string;
  /**
   * The tag
   * @format string
   * @example "expensive"
   */
  tag: string;
  /**
   * The date to which the tag is applicable.
   * @format date
   * @example "2018-09-17"
   */
  date?: string | null;
  /**
   * @format string
   * @example "Tag for expensive stuff"
   */
  description?: string | null;
  /**
   * Latitude of the tag's location, if applicable. Can be used to draw a map.
   * @format double
   * @example 51.983333
   */
  latitude?: number | null;
  /**
   * Latitude of the tag's location, if applicable. Can be used to draw a map.
   * @format double
   * @example 5.916667
   */
  longitude?: number | null;
  /**
   * Zoom level for the map, if drawn. This to set the box right. Unfortunately this is a proprietary value because each map provider has different zoom levels.
   * @format int32
   * @example 6
   */
  zoom_level?: number | null;
}

/** A single tag */
export interface TagModelStore {
  /**
   * The tag
   * @format string
   * @example "expensive"
   */
  tag: string;
  /**
   * The date to which the tag is applicable.
   * @format date
   * @example "2018-09-17"
   */
  date?: string | null;
  /**
   * @format string
   * @example "Tag for expensive stuff"
   */
  description?: string | null;
  /**
   * Latitude of the tag's location, if applicable. Can be used to draw a map.
   * @format double
   * @example 51.983333
   */
  latitude?: number | null;
  /**
   * Latitude of the tag's location, if applicable. Can be used to draw a map.
   * @format double
   * @example 5.916667
   */
  longitude?: number | null;
  /**
   * Zoom level for the map, if drawn. This to set the box right. Unfortunately this is a proprietary value because each map provider has different zoom levels.
   * @format int32
   * @example 6
   */
  zoom_level?: number | null;
}

/** A single tag */
export interface TagModelUpdate {
  /**
   * The tag
   * @format string
   * @example "expensive"
   */
  tag?: string;
  /**
   * The date to which the tag is applicable.
   * @format date
   * @example "2018-09-17"
   */
  date?: string | null;
  /**
   * @format string
   * @example "Tag for expensive stuff"
   */
  description?: string | null;
  /**
   * Latitude of the tag's location, if applicable. Can be used to draw a map.
   * @format double
   * @example 51.983333
   */
  latitude?: number | null;
  /**
   * Latitude of the tag's location, if applicable. Can be used to draw a map.
   * @format double
   * @example 5.916667
   */
  longitude?: number | null;
  /**
   * Zoom level for the map, if drawn. This to set the box right. Unfortunately this is a proprietary value because each map provider has different zoom levels.
   * @format int32
   * @example 6
   */
  zoom_level?: number | null;
}

export interface Currency {
  /**
   * @format date-time
   * @example "2018-09-17T12:46:47+01:00"
   */
  created_at?: string;
  /**
   * @format date-time
   * @example "2018-09-17T12:46:47+01:00"
   */
  updated_at?: string;
  /**
   * Defaults to true
   * @format boolean
   * @default true
   * @example true
   */
  enabled?: boolean;
  /**
   * Make this currency the default currency.
   * @format boolean
   * @example false
   */
  default?: boolean;
  /**
   * @format string
   * @example "AMS"
   */
  code: string;
  /**
   * @format string
   * @example "Ankh-Morpork dollar"
   */
  name: string;
  /**
   * @format string
   * @example "AM$"
   */
  symbol: string;
  /**
   * Supports 0-16 decimals.
   * @format int32
   * @example 2
   */
  decimal_places?: number;
}

export interface CurrencyStore {
  /**
   * Defaults to true
   * @format boolean
   * @default true
   * @example true
   */
  enabled?: boolean;
  /**
   * Make this currency the default currency. You can set this value to FALSE, in which case nothing will change to the default currency. If you set it to TRUE, the current default currency will no longer be the default currency.
   * @format boolean
   * @example true
   */
  default?: boolean;
  /**
   * @format string
   * @example "AMS"
   */
  code: string;
  /**
   * @format string
   * @example "Ankh-Morpork dollar"
   */
  name: string;
  /**
   * @format string
   * @example "AM$"
   */
  symbol: string;
  /**
   * Supports 0-16 decimals.
   * @format int32
   * @example 2
   */
  decimal_places?: number;
}

export interface CurrencyUpdate {
  /**
   * If the currency is enabled
   * @format boolean
   * @example true
   */
  enabled?: boolean;
  /**
   * If the currency must be the default for the user. You can only submit TRUE. Submitting FALSE will not drop this currency as the default currency, because then the system would be without one.
   * @format boolean
   * @example true
   */
  default?: true;
  /**
   * The currency code
   * @format string
   * @example "AMS"
   */
  code?: string;
  /**
   * The currency name
   * @format string
   * @example "Ankh-Morpork dollar"
   */
  name?: string;
  /**
   * The currency symbol
   * @format string
   * @example "AM$"
   */
  symbol?: string;
  /**
   * How many decimals to use when displaying this currency. Between 0 and 16.
   * @format int32
   * @example 2
   */
  decimal_places?: number;
}

export interface Transaction {
  /**
   * @format date-time
   * @example "2018-09-17T12:46:47+01:00"
   */
  created_at?: string;
  /**
   * @format date-time
   * @example "2018-09-17T12:46:47+01:00"
   */
  updated_at?: string;
  /**
   * User ID
   * @format string
   * @example "3"
   */
  user?: string;
  /**
   * Title of the transaction if it has been split in more than one piece. Empty otherwise.
   * @format string
   * @example "Split transaction title."
   */
  group_title?: string | null;
  transactions: TransactionSplit[];
}

export interface TransactionStore {
  /**
   * Break if the submitted transaction exists already.
   * @format boolean
   * @example false
   */
  error_if_duplicate_hash?: boolean;
  /**
   * Whether or not to apply rules when submitting transaction.
   * @format boolean
   * @example false
   */
  apply_rules?: boolean;
  /**
   * Whether or not to fire the webhooks that are related to this event.
   * @format boolean
   * @default true
   * @example true
   */
  fire_webhooks?: boolean;
  /**
   * Title of the transaction if it has been split in more than one piece. Empty otherwise.
   * @format string
   * @example "Split transaction title."
   */
  group_title?: string | null;
  transactions: TransactionSplitStore[];
}

export interface TransactionUpdate {
  /**
   * Whether or not to apply rules when submitting transaction.
   * @format boolean
   * @example false
   */
  apply_rules?: boolean;
  /**
   * Whether or not to fire the webhooks that are related to this event.
   * @format boolean
   * @default true
   * @example true
   */
  fire_webhooks?: boolean;
  /**
   * Title of the transaction if it has been split in more than one piece. Empty otherwise.
   * @format string
   * @example "Split transaction title."
   */
  group_title?: string | null;
  transactions?: TransactionSplitUpdate[];
}

export interface TransactionLink {
  /**
   * @format date-time
   * @example "2018-09-17T12:46:47+01:00"
   */
  created_at?: string;
  /**
   * @format date-time
   * @example "2018-09-17T12:46:47+01:00"
   */
  updated_at?: string;
  /**
   * The link type ID to use. You can also use the link_type_name field.
   * @format string
   * @example "5"
   */
  link_type_id: string;
  /**
   * The link type name to use. You can also use the link_type_id field.
   * @format string
   * @example "Is paid by"
   */
  link_type_name?: string;
  /**
   * The inward transaction transaction_journal_id for the link. This becomes the 'is paid by' transaction of the set.
   * @format string
   * @example "131"
   */
  inward_id: string;
  /**
   * The outward transaction transaction_journal_id for the link. This becomes the 'pays for' transaction of the set.
   * @format string
   * @example "131"
   */
  outward_id: string;
  /**
   * Optional. Some notes.
   * @format string
   * @example "Some example notes"
   */
  notes?: string | null;
}

export interface TransactionLinkStore {
  /**
   * The link type ID to use. You can also use the link_type_name field.
   * @format string
   * @example "5"
   */
  link_type_id: string;
  /**
   * The link type name to use. You can also use the link_type_id field.
   * @format string
   * @example "Is paid by"
   */
  link_type_name?: string;
  /**
   * The inward transaction transaction_journal_id for the link. This becomes the 'is paid by' transaction of the set.
   * @format string
   * @example "131"
   */
  inward_id: string;
  /**
   * The outward transaction transaction_journal_id for the link. This becomes the 'pays for' transaction of the set.
   * @format string
   * @example "131"
   */
  outward_id: string;
  /**
   * Optional. Some notes.
   * @format string
   * @example "Some example notes"
   */
  notes?: string | null;
}

export interface TransactionLinkUpdate {
  /**
   * The link type ID to use. Use this field OR use the link_type_name field.
   * @format string
   * @example "5"
   */
  link_type_id?: string;
  /**
   * The link type name to use. Use this field OR use the link_type_id field.
   * @format string
   * @example "Is paid by"
   */
  link_type_name?: string;
  /**
   * The inward transaction transaction_journal_id for the link. This becomes the 'is paid by' transaction of the set.
   * @format string
   * @example "131"
   */
  inward_id?: string;
  /**
   * The outward transaction transaction_journal_id for the link. This becomes the 'pays for' transaction of the set.
   * @format string
   * @example "131"
   */
  outward_id?: string;
  /**
   * Optional. Some notes. If you submit an empty string the current notes will be removed
   * @format string
   * @example "Some example notes"
   */
  notes?: string | null;
}

export interface LinkType {
  /**
   * @format string
   * @example "Paid"
   */
  name: string;
  /**
   * @format string
   * @example "is (partially) paid for by"
   */
  inward: string;
  /**
   * @format string
   * @example "(partially) pays for"
   */
  outward: string;
  /**
   * @format boolean
   * @example false
   */
  editable?: boolean;
}

export interface LinkTypeUpdate {
  /**
   * @format string
   * @example "Paid"
   */
  name?: string;
  /**
   * @format string
   * @example "is (partially) paid for by"
   */
  inward?: string;
  /**
   * @format string
   * @example "(partially) pays for"
   */
  outward?: string;
}

export interface TransactionSplit {
  /**
   * User ID
   * @format string
   * @example "3"
   */
  user?: string;
  /**
   * ID of the underlying transaction journal. Each transaction consists of a transaction group (see the top ID) and one or more journals
   * making up the splits of the transaction.
   * @format string
   * @example "10421"
   */
  transaction_journal_id?: string;
  type: TransactionTypeProperty;
  /**
   * Date of the transaction
   * @format date-time
   * @example "2018-09-17T12:46:47+01:00"
   */
  date: string;
  /**
   * Order of this entry in the list of transactions.
   * @format int32
   * @example 0
   */
  order?: number | null;
  /**
   * Currency ID. Default is the source account's currency, or the user's default currency. Can be used instead of currency_code.
   * @format string
   * @example "12"
   */
  currency_id?: string | null;
  /**
   * Currency code. Default is the source account's currency, or the user's default currency. Can be used instead of currency_id.
   * @format string
   * @example "EUR"
   */
  currency_code?: string | null;
  /**
   * @format string
   * @example "$"
   */
  currency_symbol?: string;
  /**
   * @format string
   * @example "Euro"
   */
  currency_name?: string;
  /**
   * Number of decimals used in this currency.
   * @format int32
   * @example 2
   */
  currency_decimal_places?: number;
  /**
   * Currency ID of the foreign currency. Default is null. Is required when you submit a foreign amount.
   * @format string
   * @example "17"
   */
  foreign_currency_id?: string | null;
  /**
   * Currency code of the foreign currency. Default is NULL. Can be used instead of the foreign_currency_id, but this or the ID is required when submitting a foreign amount.
   * @format string
   * @example "USD"
   */
  foreign_currency_code?: string | null;
  /**
   * @format string
   * @example "$"
   */
  foreign_currency_symbol?: string | null;
  /**
   * Number of decimals in the currency
   * @format int32
   * @example 2
   */
  foreign_currency_decimal_places?: number | null;
  /**
   * Amount of the transaction.
   * @format amount
   * @example "123.45"
   */
  amount: string;
  /**
   * The amount in a foreign currency.
   * @format amount
   * @example "123.45"
   */
  foreign_amount?: string | null;
  /**
   * Description of the transaction.
   * @format string
   * @example "Vegetables"
   */
  description: string;
  /**
   * ID of the source account. For a withdrawal or a transfer, this must always be an asset account. For deposits, this must be a revenue account.
   * @format string
   * @example "2"
   */
  source_id: string | null;
  /**
   * Name of the source account. For a withdrawal or a transfer, this must always be an asset account. For deposits, this must be a revenue account. Can be used instead of the source_id. If the transaction is a deposit, the source_name can be filled in freely: the account will be created based on the name.
   * @format string
   * @example "Checking account"
   */
  source_name?: string | null;
  /**
   * @format string
   * @example "NL02ABNA0123456789"
   */
  source_iban?: string | null;
  source_type?: AccountTypeProperty;
  /**
   * ID of the destination account. For a deposit or a transfer, this must always be an asset account. For withdrawals this must be an expense account.
   * @format string
   * @example "2"
   */
  destination_id: string | null;
  /**
   * Name of the destination account. You can submit the name instead of the ID. For everything except transfers, the account will be auto-generated if unknown, so submitting a name is enough.
   * @format string
   * @example "Buy and Large"
   */
  destination_name?: string | null;
  /**
   * @format string
   * @example "NL02ABNA0123456789"
   */
  destination_iban?: string | null;
  destination_type?: AccountTypeProperty;
  /**
   * The budget ID for this transaction.
   * @format string
   * @example "4"
   */
  budget_id?: string | null;
  /**
   * The name of the budget to be used. If the budget name is unknown, the ID will be used or the value will be ignored.
   * @format string
   * @example "Groceries"
   */
  budget_name?: string | null;
  /**
   * The category ID for this transaction.
   * @format string
   * @example "43"
   */
  category_id?: string | null;
  /**
   * The name of the category to be used. If the category is unknown, it will be created. If the ID and the name point to different categories, the ID overrules the name.
   * @format string
   * @example "Groceries"
   */
  category_name?: string | null;
  /**
   * Optional. Use either this or the bill_name
   * @format string
   * @example "111"
   */
  bill_id?: string | null;
  /**
   * Optional. Use either this or the bill_id
   * @format string
   * @example "Monthly rent"
   */
  bill_name?: string | null;
  /**
   * If the transaction has been reconciled already. When you set this, the amount can no longer be edited by the user.
   * @format boolean
   * @example false
   */
  reconciled?: boolean;
  /**
   * @format string
   * @example "Some example notes"
   */
  notes?: string | null;
  /**
   * Array of tags.
   * @example null
   */
  tags?: string[] | null;
  /**
   * Reference to internal reference of other systems.
   * @format string
   */
  internal_reference?: string | null;
  /**
   * Reference to external ID in other systems.
   * @format string
   */
  external_id?: string | null;
  /**
   * External, custom URL for this transaction.
   * @format string
   */
  external_url?: string | null;
  /**
   * System generated identifier for original creator of transaction.
   * @format string
   */
  original_source?: string | null;
  /**
   * Reference to recurrence that made the transaction.
   * @format string
   */
  recurrence_id?: string | null;
  /**
   * Total number of transactions expected to be created by this recurrence repetition. Will be 0 if infinite.
   * @format int32
   * @example 0
   */
  recurrence_total?: number | null;
  /**
   * The # of the current transaction created under this recurrence.
   * @format int32
   * @example 12
   */
  recurrence_count?: number | null;
  /**
   * Internal ID of bunq transaction. DEPRECATED
   * @format string
   */
  bunq_payment_id?: string | null;
  /**
   * Hash value of original import transaction (for duplicate detection).
   * @format string
   */
  import_hash_v2?: string | null;
  /**
   * SEPA Clearing Code
   * @format string
   */
  sepa_cc?: string | null;
  /**
   * SEPA Opposing Account Identifier
   * @format string
   */
  sepa_ct_op?: string | null;
  /**
   * SEPA end-to-end Identifier
   * @format string
   */
  sepa_ct_id?: string | null;
  /**
   * SEPA mandate identifier
   * @format string
   */
  sepa_db?: string | null;
  /**
   * SEPA Country
   * @format string
   */
  sepa_country?: string | null;
  /**
   * SEPA External Purpose indicator
   * @format string
   */
  sepa_ep?: string | null;
  /**
   * SEPA Creditor Identifier
   * @format string
   */
  sepa_ci?: string | null;
  /**
   * SEPA Batch ID
   * @format string
   */
  sepa_batch_id?: string | null;
  /** @format date-time */
  interest_date?: string | null;
  /** @format date-time */
  book_date?: string | null;
  /** @format date-time */
  process_date?: string | null;
  /** @format date-time */
  due_date?: string | null;
  /** @format date-time */
  payment_date?: string | null;
  /** @format date-time */
  invoice_date?: string | null;
  /**
   * Latitude of the transaction's location, if applicable. Can be used to draw a map.
   * @format double
   * @example 51.983333
   */
  latitude?: number | null;
  /**
   * Latitude of the transaction's location, if applicable. Can be used to draw a map.
   * @format double
   * @example 5.916667
   */
  longitude?: number | null;
  /**
   * Zoom level for the map, if drawn. This to set the box right. Unfortunately this is a proprietary value because each map provider has different zoom levels.
   * @format int32
   * @example 6
   */
  zoom_level?: number | null;
  /**
   * If the transaction has attachments.
   * @format boolean
   * @example false
   */
  has_attachments?: boolean;
}

export interface TransactionSplitStore {
  type: TransactionTypeProperty;
  /**
   * Date of the transaction
   * @format date-time
   * @example "2018-09-17T12:46:47+01:00"
   */
  date: string;
  /**
   * Amount of the transaction.
   * @format amount
   * @example "123.45"
   */
  amount: string;
  /**
   * Description of the transaction.
   * @format string
   * @example "Vegetables"
   */
  description: string;
  /**
   * Order of this entry in the list of transactions.
   * @format int32
   * @example 0
   */
  order?: number | null;
  /**
   * Currency ID. Default is the source account's currency, or the user's default currency. The value you submit may be overruled by the source or destination account.
   * @format string
   * @example "12"
   */
  currency_id?: string | null;
  /**
   * Currency code. Default is the source account's currency, or the user's default currency. The value you submit may be overruled by the source or destination account.
   * @format string
   * @example "EUR"
   */
  currency_code?: string | null;
  /**
   * The amount in a foreign currency.
   * @format amount
   * @example "123.45"
   */
  foreign_amount?: string | null;
  /**
   * Currency ID of the foreign currency. Default is null. Is required when you submit a foreign amount.
   * @format string
   * @example "17"
   */
  foreign_currency_id?: string | null;
  /**
   * Currency code of the foreign currency. Default is NULL. Can be used instead of the foreign_currency_id, but this or the ID is required when submitting a foreign amount.
   * @format string
   * @example "USD"
   */
  foreign_currency_code?: string | null;
  /**
   * The budget ID for this transaction.
   * @format string
   * @example "4"
   */
  budget_id?: string | null;
  /**
   * The name of the budget to be used. If the budget name is unknown, the ID will be used or the value will be ignored.
   * @format string
   * @example "Groceries"
   */
  budget_name?: string | null;
  /**
   * The category ID for this transaction.
   * @format string
   * @example "43"
   */
  category_id?: string | null;
  /**
   * The name of the category to be used. If the category is unknown, it will be created. If the ID and the name point to different categories, the ID overrules the name.
   * @format string
   * @example "Groceries"
   */
  category_name?: string | null;
  /**
   * ID of the source account. For a withdrawal or a transfer, this must always be an asset account. For deposits, this must be a revenue account.
   * @format string
   * @example "2"
   */
  source_id?: string | null;
  /**
   * Name of the source account. For a withdrawal or a transfer, this must always be an asset account. For deposits, this must be a revenue account. Can be used instead of the source_id. If the transaction is a deposit, the source_name can be filled in freely: the account will be created based on the name.
   * @format string
   * @example "Checking account"
   */
  source_name?: string | null;
  /**
   * ID of the destination account. For a deposit or a transfer, this must always be an asset account. For withdrawals this must be an expense account.
   * @format string
   * @example "2"
   */
  destination_id?: string | null;
  /**
   * Name of the destination account. You can submit the name instead of the ID. For everything except transfers, the account will be auto-generated if unknown, so submitting a name is enough.
   * @format string
   * @example "Buy and Large"
   */
  destination_name?: string | null;
  /**
   * If the transaction has been reconciled already. When you set this, the amount can no longer be edited by the user.
   * @format boolean
   * @example false
   */
  reconciled?: boolean;
  /**
   * Optional. Use either this or the piggy_bank_name
   * @format int32
   */
  piggy_bank_id?: number | null;
  /**
   * Optional. Use either this or the piggy_bank_id
   * @format string
   */
  piggy_bank_name?: string | null;
  /**
   * Optional. Use either this or the bill_name
   * @format string
   * @example "112"
   */
  bill_id?: string | null;
  /**
   * Optional. Use either this or the bill_id
   * @format string
   * @example "Monthly rent"
   */
  bill_name?: string | null;
  /**
   * Array of tags.
   * @example null
   */
  tags?: string[] | null;
  /**
   * @format string
   * @example "Some example notes"
   */
  notes?: string | null;
  /**
   * Reference to internal reference of other systems.
   * @format string
   */
  internal_reference?: string | null;
  /**
   * Reference to external ID in other systems.
   * @format string
   */
  external_id?: string | null;
  /**
   * External, custom URL for this transaction.
   * @format string
   */
  external_url?: string | null;
  /**
   * Internal ID of bunq transaction. Field is no longer used but still works.
   * @format string
   */
  bunq_payment_id?: string | null;
  /**
   * SEPA Clearing Code
   * @format string
   */
  sepa_cc?: string | null;
  /**
   * SEPA Opposing Account Identifier
   * @format string
   */
  sepa_ct_op?: string | null;
  /**
   * SEPA end-to-end Identifier
   * @format string
   */
  sepa_ct_id?: string | null;
  /**
   * SEPA mandate identifier
   * @format string
   */
  sepa_db?: string | null;
  /**
   * SEPA Country
   * @format string
   */
  sepa_country?: string | null;
  /**
   * SEPA External Purpose indicator
   * @format string
   */
  sepa_ep?: string | null;
  /**
   * SEPA Creditor Identifier
   * @format string
   */
  sepa_ci?: string | null;
  /**
   * SEPA Batch ID
   * @format string
   */
  sepa_batch_id?: string | null;
  /** @format date-time */
  interest_date?: string | null;
  /** @format date-time */
  book_date?: string | null;
  /** @format date-time */
  process_date?: string | null;
  /** @format date-time */
  due_date?: string | null;
  /** @format date-time */
  payment_date?: string | null;
  /** @format date-time */
  invoice_date?: string | null;
}

export interface TransactionSplitUpdate {
  /**
   * Transaction journal ID of current transaction (split).
   * @format string
   * @example "123"
   */
  transaction_journal_id?: string;
  type?: TransactionTypeProperty;
  /**
   * Date of the transaction
   * @format date-time
   * @example "2018-09-17T12:46:47+01:00"
   */
  date?: string;
  /**
   * Amount of the transaction.
   * @format amount
   * @example "123.45"
   */
  amount?: string;
  /**
   * Description of the transaction.
   * @format string
   * @example "Vegetables"
   */
  description?: string;
  /**
   * Order of this entry in the list of transactions.
   * @format int32
   * @example 0
   */
  order?: number | null;
  /**
   * Currency ID. Default is the source account's currency, or the user's default currency. Can be used instead of currency_code.
   * @format string
   * @example "12"
   */
  currency_id?: string | null;
  /**
   * Currency code. Default is the source account's currency, or the user's default currency. Can be used instead of currency_id.
   * @format string
   * @example "EUR"
   */
  currency_code?: string | null;
  /**
   * @format string
   * @example "$"
   */
  currency_symbol?: string;
  /**
   * @format string
   * @example "Euro"
   */
  currency_name?: string;
  /**
   * Number of decimals used in this currency.
   * @format int32
   * @example 2
   */
  currency_decimal_places?: number;
  /**
   * The amount in a foreign currency.
   * @format amount
   * @example "123.45"
   */
  foreign_amount?: string | null;
  /**
   * Currency ID of the foreign currency. Default is null. Is required when you submit a foreign amount.
   * @format string
   * @example "17"
   */
  foreign_currency_id?: string | null;
  /**
   * Currency code of the foreign currency. Default is NULL. Can be used instead of the foreign_currency_id, but this or the ID is required when submitting a foreign amount.
   * @format string
   * @example "USD"
   */
  foreign_currency_code?: string | null;
  /**
   * @format string
   * @example "$"
   */
  foreign_currency_symbol?: string | null;
  /**
   * Number of decimals in the currency
   * @format int32
   * @example 2
   */
  foreign_currency_decimal_places?: number | null;
  /**
   * The budget ID for this transaction.
   * @format string
   * @example "4"
   */
  budget_id?: string | null;
  /**
   * The name of the budget to be used. If the budget name is unknown, the ID will be used or the value will be ignored.
   * @format string
   * @example "Groceries"
   */
  budget_name?: string | null;
  /**
   * The category ID for this transaction.
   * @format string
   * @example "43"
   */
  category_id?: string | null;
  /**
   * The name of the category to be used. If the category is unknown, it will be created. If the ID and the name point to different categories, the ID overrules the name.
   * @format string
   * @example "Groceries"
   */
  category_name?: string | null;
  /**
   * ID of the source account. For a withdrawal or a transfer, this must always be an asset account. For deposits, this must be a revenue account.
   * @format string
   * @example "2"
   */
  source_id?: string | null;
  /**
   * Name of the source account. For a withdrawal or a transfer, this must always be an asset account. For deposits, this must be a revenue account. Can be used instead of the source_id. If the transaction is a deposit, the source_name can be filled in freely: the account will be created based on the name.
   * @format string
   * @example "Checking account"
   */
  source_name?: string | null;
  /**
   * @format string
   * @example "NL02ABNA0123456789"
   */
  source_iban?: string | null;
  /**
   * ID of the destination account. For a deposit or a transfer, this must always be an asset account. For withdrawals this must be an expense account.
   * @format string
   * @example "2"
   */
  destination_id?: string | null;
  /**
   * Name of the destination account. You can submit the name instead of the ID. For everything except transfers, the account will be auto-generated if unknown, so submitting a name is enough.
   * @format string
   * @example "Buy and Large"
   */
  destination_name?: string | null;
  /**
   * @format string
   * @example "NL02ABNA0123456789"
   */
  destination_iban?: string | null;
  /**
   * If the transaction has been reconciled already. When you set this, the amount can no longer be edited by the user.
   * @format boolean
   * @example false
   */
  reconciled?: boolean;
  /**
   * Optional. Use either this or the bill_name
   * @format string
   * @example "111"
   */
  bill_id?: string | null;
  /**
   * Optional. Use either this or the bill_id
   * @format string
   * @example "Monthly rent"
   */
  bill_name?: string | null;
  /**
   * Array of tags.
   * @example null
   */
  tags?: string[] | null;
  /**
   * @format string
   * @example "Some example notes"
   */
  notes?: string | null;
  /**
   * Reference to internal reference of other systems.
   * @format string
   */
  internal_reference?: string | null;
  /**
   * Reference to external ID in other systems.
   * @format string
   */
  external_id?: string | null;
  /**
   * External, custom URL for this transaction.
   * @format string
   */
  external_url?: string | null;
  /**
   * Internal ID of bunq transaction.
   * @format string
   */
  bunq_payment_id?: string | null;
  /**
   * SEPA Clearing Code
   * @format string
   */
  sepa_cc?: string | null;
  /**
   * SEPA Opposing Account Identifier
   * @format string
   */
  sepa_ct_op?: string | null;
  /**
   * SEPA end-to-end Identifier
   * @format string
   */
  sepa_ct_id?: string | null;
  /**
   * SEPA mandate identifier
   * @format string
   */
  sepa_db?: string | null;
  /**
   * SEPA Country
   * @format string
   */
  sepa_country?: string | null;
  /**
   * SEPA External Purpose indicator
   * @format string
   */
  sepa_ep?: string | null;
  /**
   * SEPA Creditor Identifier
   * @format string
   */
  sepa_ci?: string | null;
  /**
   * SEPA Batch ID
   * @format string
   */
  sepa_batch_id?: string | null;
  /** @format date-time */
  interest_date?: string | null;
  /** @format date-time */
  book_date?: string | null;
  /** @format date-time */
  process_date?: string | null;
  /** @format date-time */
  due_date?: string | null;
  /** @format date-time */
  payment_date?: string | null;
  /** @format date-time */
  invoice_date?: string | null;
}

/** A single user */
export interface User {
  /**
   * @format date-time
   * @example "2018-09-17T12:46:47+01:00"
   */
  created_at?: string;
  /**
   * @format date-time
   * @example "2018-09-17T12:46:47+01:00"
   */
  updated_at?: string;
  /**
   * The new users email address.
   * @format email
   * @example "james@firefly-iii.org"
   */
  email: string;
  /**
   * Boolean to indicate if the user is blocked.
   * @format boolean
   * @example false
   */
  blocked?: boolean;
  /** If you say the user must be blocked, this will be the reason code. */
  blocked_code?: UserBlockedCodeProperty;
  /** Role for the user. Can be empty or omitted. */
  role?: UserRoleProperty;
}

/** A single webhook */
export interface Webhook {
  /**
   * @format date-time
   * @example "2018-09-17T12:46:47+01:00"
   */
  created_at?: string;
  /**
   * @format date-time
   * @example "2018-09-17T12:46:47+01:00"
   */
  updated_at?: string;
  /**
   * Boolean to indicate if the webhook is active
   * @format boolean
   * @example false
   */
  active?: boolean;
  /**
   * A title for the webhook for easy recognition.
   * @format string
   * @example "Update magic mirror on new transaction"
   */
  title: string;
  /**
   * A 24-character secret for the webhook. It's generated by Firefly III when saving a new webhook. If you submit a new secret through the PUT endpoint it will generate a new secret for the selected webhook, a new secret bearing no relation to whatever you just submitted.
   * @format string
   * @example "iMLZLtLx2JHWhK9Dtyuoqyir"
   */
  secret?: string;
  /** The trigger for the webhook. */
  trigger: WebhookTrigger;
  /** Indicator for what Firefly III will deliver to the webhook URL. */
  response: WebhookResponse;
  /** Format of the delivered response. */
  delivery: WebhookDelivery;
  /**
   * The URL of the webhook. Has to start with `https`.
   * @format string
   * @example "https://example.com"
   */
  url: string;
}

/** A single webhook */
export interface WebhookStore {
  /**
   * Boolean to indicate if the webhook is active
   * @format boolean
   * @example false
   */
  active?: boolean;
  /**
   * A title for the webhook for easy recognition.
   * @format string
   * @example "Update magic mirror on new transaction"
   */
  title: string;
  /** The trigger for the webhook. */
  trigger: WebhookTrigger;
  /** Indicator for what Firefly III will deliver to the webhook URL. */
  response: WebhookResponse;
  /** Format of the delivered response. */
  delivery: WebhookDelivery;
  /**
   * The URL of the webhook. Has to start with `https`.
   * @format string
   * @example "https://example.com"
   */
  url: string;
}

/** A single webhook */
export interface WebhookUpdate {
  /**
   * Boolean to indicate if the webhook is active
   * @format boolean
   * @example false
   */
  active?: boolean;
  /**
   * A title for the webhook for easy recognition.
   * @format string
   * @example "Update magic mirror on new transaction"
   */
  title?: string;
  /**
   * A 24-character secret for the webhook. It's generated by Firefly III when saving a new webhook. If you submit a new secret through the PUT endpoint it will generate a new secret for the selected webhook, a new secret bearing no relation to whatever you just submitted.
   * @format string
   * @example "iMLZLtLx2JHWhK9Dtyuoqyir"
   */
  secret?: string;
  /** The trigger for the webhook. */
  trigger?: WebhookTrigger;
  /** Indicator for what Firefly III will deliver to the webhook URL. */
  response?: WebhookResponse;
  /** Format of the delivered response. */
  delivery?: WebhookDelivery;
  /**
   * The URL of the webhook. Has to start with `https`.
   * @format string
   * @example "https://example.com"
   */
  url?: string;
}

export interface WebhookAttempt {
  /**
   * @format date-time
   * @example "2018-09-17T12:46:47+01:00"
   */
  created_at?: string;
  /**
   * @format date-time
   * @example "2018-09-17T12:46:47+01:00"
   */
  updated_at?: string;
  /**
   * The ID of the webhook message this attempt belongs to.
   * @format string
   * @example "5"
   */
  webhook_message_id?: string;
  /**
   * The HTTP status code of the error, if any.
   * @format int32
   * @example 404
   */
  status_code?: number | null;
  /**
   * Internal log for this attempt. May contain sensitive user data.
   * @format string
   * @example "Page not found"
   */
  logs?: string | null;
  /**
   * Webhook receiver response for this attempt, if any. May contain sensitive user data.
   * @format amount
   * @example "Page not found"
   */
  response?: string | null;
}

export interface WebhookMessage {
  /**
   * @format date-time
   * @example "2018-09-17T12:46:47+01:00"
   */
  created_at?: string;
  /**
   * @format date-time
   * @example "2018-09-17T12:46:47+01:00"
   */
  updated_at?: string;
  /**
   * If this message is sent yet.
   * @format boolean
   * @example false
   */
  sent?: boolean;
  /**
   * If this message has errored out.
   * @format boolean
   * @example false
   */
  errored?: boolean;
  /**
   * The ID of the webhook this message belongs to.
   * @format string
   * @example "5"
   */
  webhook_id?: string;
  /**
   * Long UUID string for identification of this webhook message.
   * @format string
   * @example "7a344c02-5b52-46b1-90e6-a437431dcf07"
   */
  uuid?: string;
  /**
   * The actual message that is sent or will be sent as JSON string.
   * @format string
   * @example "{some:message}"
   */
  message?: string | null;
}

/**
 * The object class to which the attachment must be linked.
 * @format string
 * @example "Bill"
 */
export enum AttachableType {
  Account = 'Account',
  Budget = 'Budget',
  Bill = 'Bill',
  TransactionJournal = 'TransactionJournal',
  PiggyBank = 'PiggyBank',
  Tag = 'Tag',
}

/**
 * Period for the auto budget
 * @format string
 * @example "monthly"
 */
export enum AutoBudgetPeriod {
  Daily = 'daily',
  Weekly = 'weekly',
  Monthly = 'monthly',
  Quarterly = 'quarterly',
  HalfYear = 'half-year',
  Yearly = 'yearly',
}

/**
 * The type of auto-budget that Firefly III must create.
 * @format string
 * @example "reset"
 */
export enum AutoBudgetType {
  Reset = 'reset',
  Rollover = 'rollover',
  None = 'none',
}

/**
 * How often the bill must be paid.
 * @format string
 * @example "monthly"
 */
export enum BillRepeatFrequency {
  Weekly = 'weekly',
  Monthly = 'monthly',
  Quarterly = 'quarterly',
  HalfYear = 'half-year',
  Yearly = 'yearly',
}

export type PolymorphicProperty = boolean | string | object | StringArrayItem[];

/**
 * The type of the repetition. ndom means: the n-th weekday of the month, where you can also specify which day of the week.
 * @format string
 * @example "weekly"
 */
export enum RecurrenceRepetitionType {
  Daily = 'daily',
  Weekly = 'weekly',
  Ndom = 'ndom',
  Monthly = 'monthly',
  Yearly = 'yearly',
}

/**
 * @format string
 * @example "withdrawal"
 */
export enum RecurrenceTransactionType {
  Withdrawal = 'withdrawal',
  Transfer = 'transfer',
  Deposit = 'deposit',
}

/**
 * The type of thing this action will do. A limited set is possible.
 * @format string
 * @example "set_category"
 */
export enum RuleActionKeyword {
  UserAction = 'user_action',
  SetCategory = 'set_category',
  ClearCategory = 'clear_category',
  SetBudget = 'set_budget',
  ClearBudget = 'clear_budget',
  AddTag = 'add_tag',
  RemoveTag = 'remove_tag',
  RemoveAllTags = 'remove_all_tags',
  SetDescription = 'set_description',
  AppendDescription = 'append_description',
  PrependDescription = 'prepend_description',
  SetSourceAccount = 'set_source_account',
  SetDestinationAccount = 'set_destination_account',
  SetNotes = 'set_notes',
  AppendNotes = 'append_notes',
  PrependNotes = 'prepend_notes',
  ClearNotes = 'clear_notes',
  LinkToBill = 'link_to_bill',
  ConvertWithdrawal = 'convert_withdrawal',
  ConvertDeposit = 'convert_deposit',
  ConvertTransfer = 'convert_transfer',
  DeleteTransaction = 'delete_transaction',
}

/**
 * The type of thing this trigger responds to. A limited set is possible
 * @format string
 * @example "user_action"
 */
export enum RuleTriggerKeyword {
  FromAccountStarts = 'from_account_starts',
  FromAccountEnds = 'from_account_ends',
  FromAccountIs = 'from_account_is',
  FromAccountContains = 'from_account_contains',
  ToAccountStarts = 'to_account_starts',
  ToAccountEnds = 'to_account_ends',
  ToAccountIs = 'to_account_is',
  ToAccountContains = 'to_account_contains',
  AmountLess = 'amount_less',
  AmountExactly = 'amount_exactly',
  AmountMore = 'amount_more',
  DescriptionStarts = 'description_starts',
  DescriptionEnds = 'description_ends',
  DescriptionContains = 'description_contains',
  DescriptionIs = 'description_is',
  TransactionType = 'transaction_type',
  CategoryIs = 'category_is',
  BudgetIs = 'budget_is',
  TagIs = 'tag_is',
  CurrencyIs = 'currency_is',
  HasAttachments = 'has_attachments',
  HasNoCategory = 'has_no_category',
  HasAnyCategory = 'has_any_category',
  HasNoBudget = 'has_no_budget',
  HasAnyBudget = 'has_any_budget',
  HasNoTag = 'has_no_tag',
  HasAnyTag = 'has_any_tag',
  NotesContains = 'notes_contains',
  NotesStart = 'notes_start',
  NotesEnd = 'notes_end',
  NotesAre = 'notes_are',
  NoNotes = 'no_notes',
  AnyNotes = 'any_notes',
  SourceAccountIs = 'source_account_is',
  DestinationAccountIs = 'destination_account_is',
  SourceAccountStarts = 'source_account_starts',
}

/**
 * Which action is necessary for the rule to fire? Use either store-journal or update-journal.
 * @format string
 * @example "store-journal"
 */
export enum RuleTriggerType {
  StoreJournal = 'store-journal',
  UpdateJournal = 'update-journal',
}

/**
 * The actual preference content.
 * @format string
 * @example "EUR"
 */
export type StringArrayItem = string;

/**
 * If you say the user must be blocked, this will be the reason code.
 * @format string
 * @example "email_changed"
 */
export enum UserBlockedCodeProperty {
  EmailChanged = 'email_changed',
}

/**
 * Role for the user. Can be empty or omitted.
 * @format string
 * @example "owner"
 */
export enum UserRoleProperty {
  Owner = 'owner',
  Demo = 'demo',
}

/**
 * Format of the delivered response.
 * @format string
 * @example "JSON"
 */
export enum WebhookDelivery {
  JSON = 'JSON',
}

/**
 * Indicator for what Firefly III will deliver to the webhook URL.
 * @format string
 * @example "RESPONSE_TRANSACTIONS"
 */
export enum WebhookResponse {
  TRANSACTIONS = 'TRANSACTIONS',
  ACCOUNTS = 'ACCOUNTS',
  NONE = 'NONE',
}

/**
 * The trigger for the webhook.
 * @format string
 * @example "DESTROY_TRANSACTION"
 */
export enum WebhookTrigger {
  STORE_TRANSACTION = 'STORE_TRANSACTION',
  UPDATE_TRANSACTION = 'UPDATE_TRANSACTION',
  DESTROY_TRANSACTION = 'DESTROY_TRANSACTION',
}

export type BasicSummary = Record<string, BasicSummaryEntry>;

export interface BasicSummaryEntry {
  /**
   * This is a reference to the type of info shared, not influenced by translations or user preferences. The EUR value is a reference to the currency code. Possibilities are: balance-in-ABC, spent-in-ABC, earned-in-ABC, bills-paid-in-ABC, bills-unpaid-in-ABC, left-to-spend-in-ABC and net-worth-in-ABC.
   * @format string
   * @example "balance-in-EUR"
   */
  key?: string;
  /**
   * A translated title for the information shared.
   * @format string
   * @example "Balance ($)"
   */
  title?: string;
  /**
   * The amount as a float.
   * @format double
   * @example 123.45
   */
  monetary_value?: number;
  /**
   * The currency ID of the associated currency.
   * @format string
   * @example "5"
   */
  currency_id?: string;
  /**
   * @format string
   * @example "EUR"
   */
  currency_code?: string;
  /**
   * @format string
   * @example "$"
   */
  currency_symbol?: string;
  /**
   * Number of decimals for the associated currency.
   * @format int32
   * @example 2
   */
  currency_decimal_places?: number;
  /**
   * The amount formatted according to the users locale
   * @format string
   * @example "$ 12.45"
   */
  value_parsed?: string;
  /**
   * Reference to a font-awesome icon without the fa- part.
   * @format string
   * @example "balance-scale"
   */
  local_icon?: string;
  /**
   * A short explanation of the amounts origin. Already formatted according to the locale of the user or translated, if relevant.
   * @format string
   * @example "$20 + $-40"
   */
  sub_title?: string;
}

export interface Configuration {
  /** Title of the configuration value. */
  title: ConfigValueFilter;
  value: PolymorphicProperty;
  /**
   * If this config variable can be edited by the user
   * @format boolean
   * @example true
   */
  editable: boolean;
}

export interface ConfigurationUpdate {
  value: PolymorphicProperty;
}

export interface CronResult {
  recurring_transactions?: CronResultRow;
  auto_budgets?: CronResultRow;
  telemetry?: CronResultRow;
}

export interface CronResultRow {
  /**
   * This value tells you if this specific cron job actually fired. It may not fire. Some cron jobs
   * only fire every 24 hours, for example.
   * @format boolean
   * @example true
   */
  job_fired?: boolean | null;
  /**
   * This value tells you if this specific cron job actually did something. The job may fire but not
   * change anything.
   * @format boolean
   * @example true
   */
  job_succeeded?: boolean | null;
  /**
   * If the cron job ran into some kind of an error, this value will be true.
   * @format boolean
   * @example false
   */
  job_errored?: boolean | null;
  /**
   * If the cron job ran into some kind of an error, this value will be the error message. The success message
   * if the job actually ran OK.
   * @format string
   * @example "Cron result message"
   */
  message?: string | null;
}

export interface SystemInfo {
  data?: {
    /**
     * @format string
     * @example "5.8.0-alpha.1"
     */
    version?: string;
    /**
     * @format string
     * @example "2.0.0-alpha.1"
     */
    api_version?: string;
    /**
     * @format string
     * @example "8.1.5"
     */
    php_version?: string;
    /**
     * @format string
     * @example "Linux"
     */
    os?: string;
    /**
     * @format string
     * @example "mysql"
     */
    driver?: string;
  };
}

export interface UserSingle {
  data: UserRead;
}

export interface Meta {
  pagination?: {
    /** @example 3 */
    total?: number;
    /** @example 20 */
    count?: number;
    /** @example 100 */
    per_page?: number;
    /** @example 1 */
    current_page?: number;
    /** @example 1 */
    total_pages?: number;
  };
}

export interface BadRequestResponse {
  /**
   * @format string
   * @example "Bad Request"
   */
  message?: string;
  /**
   * @format string
   * @example "BadRequestHttpException"
   */
  exception?: string;
}

export interface InternalExceptionResponse {
  /**
   * @format string
   * @example "Internal Exception"
   */
  message?: string;
  /**
   * @format string
   * @example "InternalException"
   */
  exception?: string;
}

export interface NotFoundResponse {
  /**
   * @format string
   * @example "Resource not found"
   */
  message?: string;
  /**
   * @format string
   * @example "NotFoundHttpException"
   */
  exception?: string;
}

export interface UnauthenticatedResponse {
  /**
   * @format string
   * @example "Unauthenticated"
   */
  message?: string;
  /**
   * @format string
   * @example "AuthenticationException"
   */
  exception?: string;
}

export interface ValidationErrorResponse {
  /**
   * @format string
   * @example "The given data was invalid."
   */
  message?: string;
  errors?: {
    email?: string[];
    blocked?: string[];
    role?: string[];
    blocked_code?: string[];
    name?: string[];
    type?: string[];
    iban?: string[];
    start?: string[];
    end?: string[];
    date?: string[];
  };
}

/**
 * Is only mandatory when the type is asset.
 * @format string
 * @example "defaultAsset"
 */
export enum AccountRoleProperty {
  DefaultAsset = 'defaultAsset',
  SharedAsset = 'sharedAsset',
  SavingAsset = 'savingAsset',
  CcAsset = 'ccAsset',
  CashWalletAsset = 'cashWalletAsset',
}

/**
 * @format string
 * @example "Asset account"
 */
export enum AccountTypeProperty {
  DefaultAccount = 'Default account',
  CashAccount = 'Cash account',
  AssetAccount = 'Asset account',
  ExpenseAccount = 'Expense account',
  RevenueAccount = 'Revenue account',
  InitialBalanceAccount = 'Initial balance account',
  BeneficiaryAccount = 'Beneficiary account',
  ImportAccount = 'Import account',
  ReconciliationAccount = 'Reconciliation account',
  Loan = 'Loan',
  Debt = 'Debt',
  Mortgage = 'Mortgage',
}

/**
 * Mandatory when the account_role is ccAsset. Can only be monthlyFull or null.
 * @format string
 * @example "monthlyFull"
 */
export enum CreditCardTypeProperty {
  MonthlyFull = 'monthlyFull',
}

/**
 * Mandatory when type is liability. Period over which the interest is calculated.
 * @format string
 * @example "monthly"
 */
export enum InterestPeriodProperty {
  Weekly = 'weekly',
  Monthly = 'monthly',
  Quarterly = 'quarterly',
  HalfYear = 'half-year',
  Yearly = 'yearly',
}

/**
 * 'credit' indicates somebody owes you the liability. 'debit' Indicates you owe this debt yourself. Works only for liabiltiies.
 * @format string
 * @example "credit"
 */
export enum LiabilityDirectionProperty {
  Credit = 'credit',
  Debit = 'debit',
}

/**
 * Mandatory when type is liability. Specifies the exact type.
 * @format string
 * @example "loan"
 */
export enum LiabilityTypeProperty {
  Loan = 'loan',
  Debt = 'debt',
  Mortgage = 'mortgage',
}

/**
 * Can only be one one these account types. import, initial-balance and reconciliation cannot be set manually.
 * @format string
 * @example "asset"
 */
export enum ShortAccountTypeProperty {
  Asset = 'asset',
  Expense = 'expense',
  Import = 'import',
  Revenue = 'revenue',
  Cash = 'cash',
  Liability = 'liability',
  Liabilities = 'liabilities',
  InitialBalance = 'initial-balance',
  Reconciliation = 'reconciliation',
}

/**
 * @format string
 * @example "withdrawal"
 */
export enum TransactionTypeProperty {
  Withdrawal = 'withdrawal',
  Deposit = 'deposit',
  Transfer = 'transfer',
  Reconciliation = 'reconciliation',
  OpeningBalance = 'opening balance',
}

export enum AccountTypeFilter {
  All = 'all',
  Asset = 'asset',
  Cash = 'cash',
  Expense = 'expense',
  Revenue = 'revenue',
  Special = 'special',
  Hidden = 'hidden',
  Liability = 'liability',
  Liabilities = 'liabilities',
  DefaultAccount = 'Default account',
  CashAccount = 'Cash account',
  AssetAccount = 'Asset account',
  ExpenseAccount = 'Expense account',
  RevenueAccount = 'Revenue account',
  InitialBalanceAccount = 'Initial balance account',
  BeneficiaryAccount = 'Beneficiary account',
  ImportAccount = 'Import account',
  ReconciliationAccount = 'Reconciliation account',
  Loan = 'Loan',
  Debt = 'Debt',
  Mortgage = 'Mortgage',
}

export enum TransactionTypeFilter {
  All = 'all',
  Withdrawal = 'withdrawal',
  Withdrawals = 'withdrawals',
  Expense = 'expense',
  Deposit = 'deposit',
  Deposits = 'deposits',
  Income = 'income',
  Transfer = 'transfer',
  Transfers = 'transfers',
  OpeningBalance = 'opening_balance',
  Reconciliation = 'reconciliation',
  Special = 'special',
  Specials = 'specials',
  Default = 'default',
}

export type QueryParamsType = Record<string | number, any>;
export type ResponseFormat = keyof Omit<Body, 'body' | 'bodyUsed'>;

export interface FullRequestParams extends Omit<RequestInit, 'body'> {
  /** set parameter to `true` for call `securityWorker` for this request */
  secure?: boolean;
  /** request path */
  path: string;
  /** content type of request body */
  type?: ContentType;
  /** query params */
  query?: QueryParamsType;
  /** format of response (i.e. response.json() -> format: "json") */
  format?: ResponseFormat;
  /** request body */
  body?: unknown;
  /** base url */
  baseUrl?: string;
  /** request cancellation token */
  cancelToken?: CancelToken;
}

export type RequestParams = Omit<
  FullRequestParams,
  'body' | 'method' | 'query' | 'path'
>;

export interface ApiConfig<SecurityDataType = unknown> {
  baseUrl?: string;
  baseApiParams?: Omit<RequestParams, 'baseUrl' | 'cancelToken' | 'signal'>;
  securityWorker?: (
    securityData: SecurityDataType | null,
  ) => Promise<RequestParams | void> | RequestParams | void;
  customFetch?: typeof fetch;
}

export interface HttpResponse<D extends unknown, E extends unknown = unknown>
  extends Response {
  data: D;
  error: E;
}

type CancelToken = Symbol | string | number;

export enum ContentType {
  Json = 'application/json',
  FormData = 'multipart/form-data',
  UrlEncoded = 'application/x-www-form-urlencoded',
  Text = 'text/plain',
}

export class HttpClient<SecurityDataType = unknown> {
  public baseUrl: string = 'https://demo.firefly-iii.org/api';
  private securityData: SecurityDataType | null = null;
  private securityWorker?: ApiConfig<SecurityDataType>['securityWorker'];
  private abortControllers = new Map<CancelToken, AbortController>();
  private customFetch = (...fetchParams: Parameters<typeof fetch>) =>
    fetch(...fetchParams);

  private baseApiParams: RequestParams = {
    credentials: 'same-origin',
    headers: {},
    redirect: 'follow',
    referrerPolicy: 'no-referrer',
  };

  constructor(apiConfig: ApiConfig<SecurityDataType> = {}) {
    Object.assign(this, apiConfig);
  }

  public setSecurityData = (data: SecurityDataType | null) => {
    this.securityData = data;
  };

  protected encodeQueryParam(key: string, value: any) {
    const encodedKey = encodeURIComponent(key);
    return `${encodedKey}=${encodeURIComponent(
      typeof value === 'number' ? value : `${value}`,
    )}`;
  }

  protected addQueryParam(query: QueryParamsType, key: string) {
    return this.encodeQueryParam(key, query[key]);
  }

  protected addArrayQueryParam(query: QueryParamsType, key: string) {
    const value = query[key];
    return value.map((v: any) => this.encodeQueryParam(key, v)).join('&');
  }

  protected toQueryString(rawQuery?: QueryParamsType): string {
    const query = rawQuery || {};
    const keys = Object.keys(query).filter(
      (key) => 'undefined' !== typeof query[key],
    );
    return keys
      .map((key) =>
        Array.isArray(query[key])
          ? this.addArrayQueryParam(query, key)
          : this.addQueryParam(query, key),
      )
      .join('&');
  }

  protected addQueryParams(rawQuery?: QueryParamsType): string {
    const queryString = this.toQueryString(rawQuery);
    return queryString ? `?${queryString}` : '';
  }

  private contentFormatters: Record<ContentType, (input: any) => any> = {
    [ContentType.Json]: (input: any) =>
      input !== null && (typeof input === 'object' || typeof input === 'string')
        ? JSON.stringify(input)
        : input,
    [ContentType.Text]: (input: any) =>
      input !== null && typeof input !== 'string'
        ? JSON.stringify(input)
        : input,
    [ContentType.FormData]: (input: any) =>
      Object.keys(input || {}).reduce((formData, key) => {
        const property = input[key];
        formData.append(
          key,
          property instanceof Blob
            ? property
            : typeof property === 'object' && property !== null
            ? JSON.stringify(property)
            : `${property}`,
        );
        return formData;
      }, new FormData()),
    [ContentType.UrlEncoded]: (input: any) => this.toQueryString(input),
  };

  protected mergeRequestParams(
    params1: RequestParams,
    params2?: RequestParams,
  ): RequestParams {
    return {
      ...this.baseApiParams,
      ...params1,
      ...(params2 || {}),
      headers: {
        ...(this.baseApiParams.headers || {}),
        ...(params1.headers || {}),
        ...((params2 && params2.headers) || {}),
      },
    };
  }

  protected createAbortSignal = (
    cancelToken: CancelToken,
  ): AbortSignal | undefined => {
    if (this.abortControllers.has(cancelToken)) {
      const abortController = this.abortControllers.get(cancelToken);
      if (abortController) {
        return abortController.signal;
      }
      return void 0;
    }

    const abortController = new AbortController();
    this.abortControllers.set(cancelToken, abortController);
    return abortController.signal;
  };

  public abortRequest = (cancelToken: CancelToken) => {
    const abortController = this.abortControllers.get(cancelToken);

    if (abortController) {
      abortController.abort();
      this.abortControllers.delete(cancelToken);
    }
  };

  public request = async <T = any, E = any>({
    body,
    secure,
    path,
    type,
    query,
    format,
    baseUrl,
    cancelToken,
    ...params
  }: FullRequestParams): Promise<HttpResponse<T, E>> => {
    const secureParams =
      ((typeof secure === 'boolean' ? secure : this.baseApiParams.secure) &&
        this.securityWorker &&
        (await this.securityWorker(this.securityData))) ||
      {};
    const requestParams = this.mergeRequestParams(params, secureParams);
    const queryString = query && this.toQueryString(query);
    const payloadFormatter = this.contentFormatters[type || ContentType.Json];
    const responseFormat = format || requestParams.format;

    return this.customFetch(
      `${baseUrl || this.baseUrl || ''}${path}${
        queryString ? `?${queryString}` : ''
      }`,
      {
        ...requestParams,
        headers: {
          ...(requestParams.headers || {}),
          ...(type && type !== ContentType.FormData
            ? { 'Content-Type': type }
            : {}),
        },
        signal:
          (cancelToken
            ? this.createAbortSignal(cancelToken)
            : requestParams.signal) || null,
        body:
          typeof body === 'undefined' || body === null
            ? null
            : payloadFormatter(body),
      },
    ).then(async (response) => {
      const r = response as HttpResponse<T, E>;
      r.data = null as unknown as T;
      r.error = null as unknown as E;

      const data = !responseFormat
        ? r
        : await response[responseFormat]()
            .then((data) => {
              if (r.ok) {
                r.data = data;
              } else {
                r.error = data;
              }
              return r;
            })
            .catch((e) => {
              r.error = e;
              return r;
            });

      if (cancelToken) {
        this.abortControllers.delete(cancelToken);
      }

      if (!response.ok) throw data;
      return data;
    });
  };
}

/**
 * @title Firefly III API v2.1.0
 * @version 2.1.0
 * @license AGPLv3 (https://www.gnu.org/licenses/agpl-3.0.en.html)
 * @baseUrl https://demo.firefly-iii.org/api
 * @contact James Cole <james@firefly-iii.org> (https://firefly-iii.org)
 *
 * This is the documentation of the Firefly III API. You can find accompanying documentation on the website of Firefly III itself (see below). Please report any bugs or issues. You may use the "Authorize" button to try the API below. This file was last generated on 2024-05-19T04:33:01+00:00
 *
 * Please keep in mind that the demo site does not accept requests from curl, colly, wget, etc. You must use a browser or a tool like Postman to make requests. Too many script kiddies out there, sorry about that.
 */
export class Api<
  SecurityDataType extends unknown,
> extends HttpClient<SecurityDataType> {
  v1 = {
    /**
     * No description
     *
     * @tags autocomplete
     * @name GetAccountsAc
     * @summary Returns all accounts of the user returned in a basic auto-complete array.
     * @request GET:/v1/autocomplete/accounts
     * @secure
     */
    getAccountsAc: (
      query?: {
        /**
         * The autocomplete search query.
         * @format string
         * @example "string"
         */
        query?: string;
        /**
         * The number of items returned.
         * @format int32
         * @example 10
         */
        limit?: number;
        /**
         * If the account is an asset account or a liability, the autocomplete will also return the balance of the account on this date.
         * @format string
         * @example "2020-09-17"
         */
        date?: string;
        /** Optional filter on the account type(s) used in the autocomplete. */
        types?: AccountTypeFilter[];
      },
      params: RequestParams = {},
    ) =>
      this.request<
        AutocompleteAccountArray,
        | BadRequestResponse
        | UnauthenticatedResponse
        | NotFoundResponse
        | InternalExceptionResponse
      >({
        path: `/v1/autocomplete/accounts`,
        method: 'GET',
        query: query,
        secure: true,
        format: 'json',
        ...params,
      }),

    /**
     * No description
     *
     * @tags autocomplete
     * @name GetBillsAc
     * @summary Returns all bills of the user returned in a basic auto-complete array.
     * @request GET:/v1/autocomplete/bills
     * @secure
     */
    getBillsAc: (
      query?: {
        /**
         * The autocomplete search query.
         * @format string
         * @example "string"
         */
        query?: string;
        /**
         * The number of items returned.
         * @format int32
         * @example 10
         */
        limit?: number;
      },
      params: RequestParams = {},
    ) =>
      this.request<
        AutocompleteBillArray,
        | BadRequestResponse
        | UnauthenticatedResponse
        | NotFoundResponse
        | InternalExceptionResponse
      >({
        path: `/v1/autocomplete/bills`,
        method: 'GET',
        query: query,
        secure: true,
        format: 'json',
        ...params,
      }),

    /**
     * No description
     *
     * @tags autocomplete
     * @name GetBudgetsAc
     * @summary Returns all budgets of the user returned in a basic auto-complete array.
     * @request GET:/v1/autocomplete/budgets
     * @secure
     */
    getBudgetsAc: (
      query?: {
        /**
         * The autocomplete search query.
         * @format string
         * @example "string"
         */
        query?: string;
        /**
         * The number of items returned.
         * @format int32
         * @example 10
         */
        limit?: number;
      },
      params: RequestParams = {},
    ) =>
      this.request<
        AutocompleteBudgetArray,
        | BadRequestResponse
        | UnauthenticatedResponse
        | NotFoundResponse
        | InternalExceptionResponse
      >({
        path: `/v1/autocomplete/budgets`,
        method: 'GET',
        query: query,
        secure: true,
        format: 'json',
        ...params,
      }),

    /**
     * No description
     *
     * @tags autocomplete
     * @name GetCategoriesAc
     * @summary Returns all categories of the user returned in a basic auto-complete array.
     * @request GET:/v1/autocomplete/categories
     * @secure
     */
    getCategoriesAc: (
      query?: {
        /**
         * The autocomplete search query.
         * @format string
         * @example "string"
         */
        query?: string;
        /**
         * The number of items returned.
         * @format int32
         * @example 10
         */
        limit?: number;
      },
      params: RequestParams = {},
    ) =>
      this.request<
        AutocompleteCategoryArray,
        | BadRequestResponse
        | UnauthenticatedResponse
        | NotFoundResponse
        | InternalExceptionResponse
      >({
        path: `/v1/autocomplete/categories`,
        method: 'GET',
        query: query,
        secure: true,
        format: 'json',
        ...params,
      }),

    /**
     * No description
     *
     * @tags autocomplete
     * @name GetCurrenciesAc
     * @summary Returns all currencies of the user returned in a basic auto-complete array.
     * @request GET:/v1/autocomplete/currencies
     * @secure
     */
    getCurrenciesAc: (
      query?: {
        /**
         * The autocomplete search query.
         * @format string
         * @example "string"
         */
        query?: string;
        /**
         * The number of items returned.
         * @format int32
         * @example 10
         */
        limit?: number;
      },
      params: RequestParams = {},
    ) =>
      this.request<
        AutocompleteCurrencyArray,
        | BadRequestResponse
        | UnauthenticatedResponse
        | NotFoundResponse
        | InternalExceptionResponse
      >({
        path: `/v1/autocomplete/currencies`,
        method: 'GET',
        query: query,
        secure: true,
        format: 'json',
        ...params,
      }),

    /**
     * No description
     *
     * @tags autocomplete
     * @name GetCurrenciesCodeAc
     * @summary Returns all currencies of the user returned in a basic auto-complete array. This endpoint is DEPRECATED and I suggest you DO NOT use it.
     * @request GET:/v1/autocomplete/currencies-with-code
     * @secure
     */
    getCurrenciesCodeAc: (
      query?: {
        /**
         * The autocomplete search query.
         * @format string
         * @example "string"
         */
        query?: string;
        /**
         * The number of items returned.
         * @format int32
         * @example 10
         */
        limit?: number;
      },
      params: RequestParams = {},
    ) =>
      this.request<
        AutocompleteCurrencyCodeArray,
        | BadRequestResponse
        | UnauthenticatedResponse
        | NotFoundResponse
        | InternalExceptionResponse
      >({
        path: `/v1/autocomplete/currencies-with-code`,
        method: 'GET',
        query: query,
        secure: true,
        format: 'json',
        ...params,
      }),

    /**
     * No description
     *
     * @tags autocomplete
     * @name GetObjectGroupsAc
     * @summary Returns all object groups of the user returned in a basic auto-complete array.
     * @request GET:/v1/autocomplete/object-groups
     * @secure
     */
    getObjectGroupsAc: (
      query?: {
        /**
         * The autocomplete search query.
         * @format string
         * @example "string"
         */
        query?: string;
        /**
         * The number of items returned.
         * @format int32
         * @example 10
         */
        limit?: number;
      },
      params: RequestParams = {},
    ) =>
      this.request<
        AutocompleteObjectGroupArray,
        | BadRequestResponse
        | UnauthenticatedResponse
        | NotFoundResponse
        | InternalExceptionResponse
      >({
        path: `/v1/autocomplete/object-groups`,
        method: 'GET',
        query: query,
        secure: true,
        format: 'json',
        ...params,
      }),

    /**
     * No description
     *
     * @tags autocomplete
     * @name GetPiggiesAc
     * @summary Returns all piggy banks of the user returned in a basic auto-complete array.
     * @request GET:/v1/autocomplete/piggy-banks
     * @secure
     */
    getPiggiesAc: (
      query?: {
        /**
         * The autocomplete search query.
         * @format string
         * @example "string"
         */
        query?: string;
        /**
         * The number of items returned.
         * @format int32
         * @example 10
         */
        limit?: number;
      },
      params: RequestParams = {},
    ) =>
      this.request<
        AutocompletePiggyArray,
        | BadRequestResponse
        | UnauthenticatedResponse
        | NotFoundResponse
        | InternalExceptionResponse
      >({
        path: `/v1/autocomplete/piggy-banks`,
        method: 'GET',
        query: query,
        secure: true,
        format: 'json',
        ...params,
      }),

    /**
     * No description
     *
     * @tags autocomplete
     * @name GetPiggiesBalanceAc
     * @summary Returns all piggy banks of the user returned in a basic auto-complete array complemented with balance information.
     * @request GET:/v1/autocomplete/piggy-banks-with-balance
     * @secure
     */
    getPiggiesBalanceAc: (
      query?: {
        /**
         * The autocomplete search query.
         * @format string
         * @example "string"
         */
        query?: string;
        /**
         * The number of items returned.
         * @format int32
         * @example 10
         */
        limit?: number;
      },
      params: RequestParams = {},
    ) =>
      this.request<
        AutocompletePiggyBalanceArray,
        | BadRequestResponse
        | UnauthenticatedResponse
        | NotFoundResponse
        | InternalExceptionResponse
      >({
        path: `/v1/autocomplete/piggy-banks-with-balance`,
        method: 'GET',
        query: query,
        secure: true,
        format: 'json',
        ...params,
      }),

    /**
     * No description
     *
     * @tags autocomplete
     * @name GetRecurringAc
     * @summary Returns all recurring transactions of the user returned in a basic auto-complete array.
     * @request GET:/v1/autocomplete/recurring
     * @secure
     */
    getRecurringAc: (
      query?: {
        /**
         * The autocomplete search query.
         * @format string
         * @example "string"
         */
        query?: string;
        /**
         * The number of items returned.
         * @format int32
         * @example 10
         */
        limit?: number;
      },
      params: RequestParams = {},
    ) =>
      this.request<
        AutocompleteRecurrenceArray,
        | BadRequestResponse
        | UnauthenticatedResponse
        | NotFoundResponse
        | InternalExceptionResponse
      >({
        path: `/v1/autocomplete/recurring`,
        method: 'GET',
        query: query,
        secure: true,
        format: 'json',
        ...params,
      }),

    /**
     * No description
     *
     * @tags autocomplete
     * @name GetRuleGroupsAc
     * @summary Returns all rule groups of the user returned in a basic auto-complete array.
     * @request GET:/v1/autocomplete/rule-groups
     * @secure
     */
    getRuleGroupsAc: (
      query?: {
        /**
         * The autocomplete search query.
         * @format string
         * @example "string"
         */
        query?: string;
        /**
         * The number of items returned.
         * @format int32
         * @example 10
         */
        limit?: number;
      },
      params: RequestParams = {},
    ) =>
      this.request<
        AutocompleteRuleGroupArray,
        | BadRequestResponse
        | UnauthenticatedResponse
        | NotFoundResponse
        | InternalExceptionResponse
      >({
        path: `/v1/autocomplete/rule-groups`,
        method: 'GET',
        query: query,
        secure: true,
        format: 'json',
        ...params,
      }),

    /**
     * No description
     *
     * @tags autocomplete
     * @name GetRulesAc
     * @summary Returns all rules of the user returned in a basic auto-complete array.
     * @request GET:/v1/autocomplete/rules
     * @secure
     */
    getRulesAc: (
      query?: {
        /**
         * The autocomplete search query.
         * @format string
         * @example "string"
         */
        query?: string;
        /**
         * The number of items returned.
         * @format int32
         * @example 10
         */
        limit?: number;
      },
      params: RequestParams = {},
    ) =>
      this.request<
        AutocompleteRuleArray,
        | BadRequestResponse
        | UnauthenticatedResponse
        | NotFoundResponse
        | InternalExceptionResponse
      >({
        path: `/v1/autocomplete/rules`,
        method: 'GET',
        query: query,
        secure: true,
        format: 'json',
        ...params,
      }),

    /**
     * No description
     *
     * @tags autocomplete
     * @name GetTagAc
     * @summary Returns all tags of the user returned in a basic auto-complete array.
     * @request GET:/v1/autocomplete/tags
     * @secure
     */
    getTagAc: (
      query?: {
        /**
         * The autocomplete search query.
         * @format string
         * @example "string"
         */
        query?: string;
        /**
         * The number of items returned.
         * @format int32
         * @example 10
         */
        limit?: number;
      },
      params: RequestParams = {},
    ) =>
      this.request<
        AutocompleteTagArray,
        | BadRequestResponse
        | UnauthenticatedResponse
        | NotFoundResponse
        | InternalExceptionResponse
      >({
        path: `/v1/autocomplete/tags`,
        method: 'GET',
        query: query,
        secure: true,
        format: 'json',
        ...params,
      }),

    /**
     * No description
     *
     * @tags autocomplete
     * @name GetTransactionTypesAc
     * @summary Returns all transaction types returned in a basic auto-complete array. English only.
     * @request GET:/v1/autocomplete/transaction-types
     * @secure
     */
    getTransactionTypesAc: (
      query?: {
        /**
         * The autocomplete search query.
         * @format string
         * @example "string"
         */
        query?: string;
        /**
         * The number of items returned.
         * @format int32
         * @example 10
         */
        limit?: number;
      },
      params: RequestParams = {},
    ) =>
      this.request<
        AutocompleteTransactionTypeArray,
        | BadRequestResponse
        | UnauthenticatedResponse
        | NotFoundResponse
        | InternalExceptionResponse
      >({
        path: `/v1/autocomplete/transaction-types`,
        method: 'GET',
        query: query,
        secure: true,
        format: 'json',
        ...params,
      }),

    /**
     * No description
     *
     * @tags autocomplete
     * @name GetTransactionsAc
     * @summary Returns all transaction descriptions of the user returned in a basic auto-complete array.
     * @request GET:/v1/autocomplete/transactions
     * @secure
     */
    getTransactionsAc: (
      query?: {
        /**
         * The autocomplete search query.
         * @format string
         * @example "string"
         */
        query?: string;
        /**
         * The number of items returned.
         * @format int32
         * @example 10
         */
        limit?: number;
      },
      params: RequestParams = {},
    ) =>
      this.request<
        AutocompleteTransactionArray,
        | BadRequestResponse
        | UnauthenticatedResponse
        | NotFoundResponse
        | InternalExceptionResponse
      >({
        path: `/v1/autocomplete/transactions`,
        method: 'GET',
        query: query,
        secure: true,
        format: 'json',
        ...params,
      }),

    /**
     * No description
     *
     * @tags autocomplete
     * @name GetTransactionsIdac
     * @summary Returns all transactions, complemented with their ID, of the user returned in a basic auto-complete array. This endpoint is DEPRECATED and I suggest you DO NOT use it.
     * @request GET:/v1/autocomplete/transactions-with-id
     * @secure
     */
    getTransactionsIdac: (
      query?: {
        /**
         * The autocomplete search query.
         * @format string
         * @example "string"
         */
        query?: string;
        /**
         * The number of items returned.
         * @format int32
         * @example 10
         */
        limit?: number;
      },
      params: RequestParams = {},
    ) =>
      this.request<
        AutocompleteTransactionIDArray,
        | BadRequestResponse
        | UnauthenticatedResponse
        | NotFoundResponse
        | InternalExceptionResponse
      >({
        path: `/v1/autocomplete/transactions-with-id`,
        method: 'GET',
        query: query,
        secure: true,
        format: 'json',
        ...params,
      }),

    /**
     * @description This endpoint returns the data required to generate a chart with basic asset account balance information.
     *
     * @tags charts
     * @name GetChartAccountOverview
     * @summary Dashboard chart with asset account balance information.
     * @request GET:/v1/chart/account/overview
     * @secure
     */
    getChartAccountOverview: (
      query: {
        /**
         * A date formatted YYYY-MM-DD.
         * @format date
         */
        start: string;
        /**
         * A date formatted YYYY-MM-DD.
         * @format date
         */
        end: string;
      },
      params: RequestParams = {},
    ) =>
      this.request<
        ChartLine,
        | BadRequestResponse
        | UnauthenticatedResponse
        | NotFoundResponse
        | InternalExceptionResponse
      >({
        path: `/v1/chart/account/overview`,
        method: 'GET',
        query: query,
        secure: true,
        format: 'json',
        ...params,
      }),

    /**
     * @description Allows you to update transactions in bulk.
     *
     * @tags data
     * @name BulkUpdateTransactions
     * @summary Bulk update transaction properties. For more information, see https://docs.firefly-iii.org/references/firefly-iii/api/specials/
     * @request POST:/v1/data/bulk/transactions
     * @secure
     */
    bulkUpdateTransactions: (
      query: {
        /**
         * The JSON query.
         * @format json
         */
        query: string;
      },
      params: RequestParams = {},
    ) =>
      this.request<
        void,
        | BadRequestResponse
        | UnauthenticatedResponse
        | NotFoundResponse
        | InternalExceptionResponse
      >({
        path: `/v1/data/bulk/transactions`,
        method: 'POST',
        query: query,
        secure: true,
        ...params,
      }),

    /**
     * @description A call to this endpoint deletes the requested data type. Use it with care and always with user permission. The demo user is incapable of using this endpoint.
     *
     * @tags data
     * @name DestroyData
     * @summary Endpoint to destroy user data
     * @request DELETE:/v1/data/destroy
     * @secure
     */
    destroyData: (
      query: {
        /** The type of data that you wish to destroy. You can only use one at a time. */
        objects: DataDestroyObject;
      },
      params: RequestParams = {},
    ) =>
      this.request<
        void,
        | BadRequestResponse
        | UnauthenticatedResponse
        | NotFoundResponse
        | InternalExceptionResponse
      >({
        path: `/v1/data/destroy`,
        method: 'DELETE',
        query: query,
        secure: true,
        ...params,
      }),

    /**
     * @description This endpoint allows you to export your accounts from Firefly III into a file. Currently supports CSV exports only.
     *
     * @tags data
     * @name ExportAccounts
     * @summary Export account data from Firefly III
     * @request GET:/v1/data/export/accounts
     * @secure
     */
    exportAccounts: (
      query?: {
        /** The file type the export file (CSV is currently the only option). */
        type?: ExportFileFilter;
      },
      params: RequestParams = {},
    ) =>
      this.request<
        File,
        | BadRequestResponse
        | UnauthenticatedResponse
        | NotFoundResponse
        | InternalExceptionResponse
      >({
        path: `/v1/data/export/accounts`,
        method: 'GET',
        query: query,
        secure: true,
        ...params,
      }),

    /**
     * @description This endpoint allows you to export your bills from Firefly III into a file. Currently supports CSV exports only.
     *
     * @tags data
     * @name ExportBills
     * @summary Export bills from Firefly III
     * @request GET:/v1/data/export/bills
     * @secure
     */
    exportBills: (
      query?: {
        /** The file type the export file (CSV is currently the only option). */
        type?: ExportFileFilter;
      },
      params: RequestParams = {},
    ) =>
      this.request<
        File,
        | BadRequestResponse
        | UnauthenticatedResponse
        | NotFoundResponse
        | InternalExceptionResponse
      >({
        path: `/v1/data/export/bills`,
        method: 'GET',
        query: query,
        secure: true,
        ...params,
      }),

    /**
     * @description This endpoint allows you to export your budgets and associated budget data from Firefly III into a file. Currently supports CSV exports only.
     *
     * @tags data
     * @name ExportBudgets
     * @summary Export budgets and budget amount data from Firefly III
     * @request GET:/v1/data/export/budgets
     * @secure
     */
    exportBudgets: (
      query?: {
        /** The file type the export file (CSV is currently the only option). */
        type?: ExportFileFilter;
      },
      params: RequestParams = {},
    ) =>
      this.request<
        File,
        | BadRequestResponse
        | UnauthenticatedResponse
        | NotFoundResponse
        | InternalExceptionResponse
      >({
        path: `/v1/data/export/budgets`,
        method: 'GET',
        query: query,
        secure: true,
        ...params,
      }),

    /**
     * @description This endpoint allows you to export your categories from Firefly III into a file. Currently supports CSV exports only.
     *
     * @tags data
     * @name ExportCategories
     * @summary Export category data from Firefly III
     * @request GET:/v1/data/export/categories
     * @secure
     */
    exportCategories: (
      query?: {
        /** The file type the export file (CSV is currently the only option). */
        type?: ExportFileFilter;
      },
      params: RequestParams = {},
    ) =>
      this.request<
        File,
        | BadRequestResponse
        | UnauthenticatedResponse
        | NotFoundResponse
        | InternalExceptionResponse
      >({
        path: `/v1/data/export/categories`,
        method: 'GET',
        query: query,
        secure: true,
        ...params,
      }),

    /**
     * @description This endpoint allows you to export your piggy banks from Firefly III into a file. Currently supports CSV exports only.
     *
     * @tags data
     * @name ExportPiggies
     * @summary Export piggy banks from Firefly III
     * @request GET:/v1/data/export/piggy-banks
     * @secure
     */
    exportPiggies: (
      query?: {
        /** The file type the export file (CSV is currently the only option). */
        type?: ExportFileFilter;
      },
      params: RequestParams = {},
    ) =>
      this.request<
        File,
        | BadRequestResponse
        | UnauthenticatedResponse
        | NotFoundResponse
        | InternalExceptionResponse
      >({
        path: `/v1/data/export/piggy-banks`,
        method: 'GET',
        query: query,
        secure: true,
        ...params,
      }),

    /**
     * @description This endpoint allows you to export your recurring transactions from Firefly III into a file. Currently supports CSV exports only.
     *
     * @tags data
     * @name ExportRecurring
     * @summary Export recurring transaction data from Firefly III
     * @request GET:/v1/data/export/recurring
     * @secure
     */
    exportRecurring: (
      query?: {
        /** The file type the export file (CSV is currently the only option). */
        type?: ExportFileFilter;
      },
      params: RequestParams = {},
    ) =>
      this.request<
        File,
        | BadRequestResponse
        | UnauthenticatedResponse
        | NotFoundResponse
        | InternalExceptionResponse
      >({
        path: `/v1/data/export/recurring`,
        method: 'GET',
        query: query,
        secure: true,
        ...params,
      }),

    /**
     * @description This endpoint allows you to export your rules and rule groups from Firefly III into a file. Currently supports CSV exports only.
     *
     * @tags data
     * @name ExportRules
     * @summary Export rule groups and rule data from Firefly III
     * @request GET:/v1/data/export/rules
     * @secure
     */
    exportRules: (
      query?: {
        /** The file type the export file (CSV is currently the only option). */
        type?: ExportFileFilter;
      },
      params: RequestParams = {},
    ) =>
      this.request<
        File,
        | BadRequestResponse
        | UnauthenticatedResponse
        | NotFoundResponse
        | InternalExceptionResponse
      >({
        path: `/v1/data/export/rules`,
        method: 'GET',
        query: query,
        secure: true,
        ...params,
      }),

    /**
     * @description This endpoint allows you to export your tags from Firefly III into a file. Currently supports CSV exports only.
     *
     * @tags data
     * @name ExportTags
     * @summary Export tag data from Firefly III
     * @request GET:/v1/data/export/tags
     * @secure
     */
    exportTags: (
      query?: {
        /** The file type the export file (CSV is currently the only option). */
        type?: ExportFileFilter;
      },
      params: RequestParams = {},
    ) =>
      this.request<
        File,
        | BadRequestResponse
        | UnauthenticatedResponse
        | NotFoundResponse
        | InternalExceptionResponse
      >({
        path: `/v1/data/export/tags`,
        method: 'GET',
        query: query,
        secure: true,
        ...params,
      }),

    /**
     * @description This endpoint allows you to export transactions from Firefly III into a file. Currently supports CSV exports only.
     *
     * @tags data
     * @name ExportTransactions
     * @summary Export transaction data from Firefly III
     * @request GET:/v1/data/export/transactions
     * @secure
     */
    exportTransactions: (
      query: {
        /**
         * A date formatted YYYY-MM-DD.
         * @format date
         */
        start: string;
        /**
         * A date formatted YYYY-MM-DD.
         * @format date
         */
        end: string;
        /**
         * Limit the export of transactions to these accounts only. Only asset accounts will be accepted. Other types will be silently dropped.
         * @format string
         * @example "1,2,3"
         */
        accounts?: string;
        /** The file type the export file (CSV is currently the only option). */
        type?: ExportFileFilter;
      },
      params: RequestParams = {},
    ) =>
      this.request<
        File,
        | BadRequestResponse
        | UnauthenticatedResponse
        | NotFoundResponse
        | InternalExceptionResponse
      >({
        path: `/v1/data/export/transactions`,
        method: 'GET',
        query: query,
        secure: true,
        ...params,
      }),

    /**
     * @description A call to this endpoint purges all previously deleted data. Use it with care and always with user permission. The demo user is incapable of using this endpoint.
     *
     * @tags data
     * @name PurgeData
     * @summary Endpoint to purge user data
     * @request DELETE:/v1/data/purge
     * @secure
     */
    purgeData: (params: RequestParams = {}) =>
      this.request<
        void,
        BadRequestResponse | UnauthenticatedResponse | InternalExceptionResponse
      >({
        path: `/v1/data/purge`,
        method: 'DELETE',
        secure: true,
        ...params,
      }),

    /**
     * @description This endpoint gives a summary of the expenses made by the user, grouped by expense account.
     *
     * @tags insight
     * @name InsightExpenseExpense
     * @summary Insight into expenses, grouped by expense account.
     * @request GET:/v1/insight/expense/expense
     * @secure
     */
    insightExpenseExpense: (
      query: {
        /**
         * A date formatted YYYY-MM-DD.
         * @format date
         */
        start: string;
        /**
         * A date formatted YYYY-MM-DD.
         * @format date
         */
        end: string;
        /**
         * The accounts to be included in the results. If you add the accounts ID's of expense accounts, only those accounts
         * are included in the results. If you include ID's of asset accounts or liabilities, only withdrawals from those
         * asset accounts / liabilities will be included. You can combine both asset / liability and expense account ID's.
         * Other account ID's will be ignored.
         * @example [1,2,3]
         */
        'accounts[]'?: number[];
      },
      params: RequestParams = {},
    ) =>
      this.request<
        InsightGroup,
        | BadRequestResponse
        | UnauthenticatedResponse
        | NotFoundResponse
        | InternalExceptionResponse
      >({
        path: `/v1/insight/expense/expense`,
        method: 'GET',
        query: query,
        secure: true,
        format: 'json',
        ...params,
      }),

    /**
     * @description This endpoint gives a summary of the expenses made by the user, grouped by asset account.
     *
     * @tags insight
     * @name InsightExpenseAsset
     * @summary Insight into expenses, grouped by asset account.
     * @request GET:/v1/insight/expense/asset
     * @secure
     */
    insightExpenseAsset: (
      query: {
        /**
         * A date formatted YYYY-MM-DD.
         * @format date
         */
        start: string;
        /**
         * A date formatted YYYY-MM-DD.
         * @format date
         */
        end: string;
        /**
         * The accounts to be included in the results. If you include ID's of asset accounts or liabilities, only withdrawals from those
         * asset accounts / liabilities will be included. Other account ID's will be ignored.
         * @example [1,2,3]
         */
        'accounts[]'?: number[];
      },
      params: RequestParams = {},
    ) =>
      this.request<
        InsightGroup,
        | BadRequestResponse
        | UnauthenticatedResponse
        | NotFoundResponse
        | InternalExceptionResponse
      >({
        path: `/v1/insight/expense/asset`,
        method: 'GET',
        query: query,
        secure: true,
        format: 'json',
        ...params,
      }),

    /**
     * @description This endpoint gives a summary of the income received by the user, grouped by revenue account.
     *
     * @tags insight
     * @name InsightIncomeRevenue
     * @summary Insight into income, grouped by revenue account.
     * @request GET:/v1/insight/income/revenue
     * @secure
     */
    insightIncomeRevenue: (
      query: {
        /**
         * A date formatted YYYY-MM-DD.
         * @format date
         */
        start: string;
        /**
         * A date formatted YYYY-MM-DD.
         * @format date
         */
        end: string;
        /**
         * The accounts to be included in the results. If you add the accounts ID's of revenue accounts, only those accounts
         * are included in the results. If you include ID's of asset accounts or liabilities, only deposits to those
         * asset accounts / liabilities will be included. You can combine both asset / liability and deposit account ID's.
         * Other account ID's will be ignored.
         * @example [1,2,3]
         */
        'accounts[]'?: number[];
      },
      params: RequestParams = {},
    ) =>
      this.request<
        InsightGroup,
        | BadRequestResponse
        | UnauthenticatedResponse
        | NotFoundResponse
        | InternalExceptionResponse
      >({
        path: `/v1/insight/income/revenue`,
        method: 'GET',
        query: query,
        secure: true,
        format: 'json',
        ...params,
      }),

    /**
     * @description This endpoint gives a summary of the income received by the user, grouped by asset account.
     *
     * @tags insight
     * @name InsightIncomeAsset
     * @summary Insight into income, grouped by asset account.
     * @request GET:/v1/insight/income/asset
     * @secure
     */
    insightIncomeAsset: (
      query: {
        /**
         * A date formatted YYYY-MM-DD.
         * @format date
         */
        start: string;
        /**
         * A date formatted YYYY-MM-DD.
         * @format date
         */
        end: string;
        /**
         * The accounts to be included in the results. If you include ID's of asset accounts or liabilities, only deposits to those
         * asset accounts / liabilities will be included. Other account ID's will be ignored.
         * @example [1,2,3]
         */
        'accounts[]'?: number[];
      },
      params: RequestParams = {},
    ) =>
      this.request<
        InsightGroup,
        | BadRequestResponse
        | UnauthenticatedResponse
        | NotFoundResponse
        | InternalExceptionResponse
      >({
        path: `/v1/insight/income/asset`,
        method: 'GET',
        query: query,
        secure: true,
        format: 'json',
        ...params,
      }),

    /**
     * @description This endpoint gives a summary of the transfers made by the user, grouped by asset account or lability.
     *
     * @tags insight
     * @name InsightTransfers
     * @summary Insight into transfers, grouped by account.
     * @request GET:/v1/insight/transfer/asset
     * @secure
     */
    insightTransfers: (
      query: {
        /**
         * A date formatted YYYY-MM-DD.
         * @format date
         */
        start: string;
        /**
         * A date formatted YYYY-MM-DD.
         * @format date
         */
        end: string;
        /**
         * The accounts to be included in the results. If you include ID's of asset accounts or liabilities, only transfers between those
         * asset accounts / liabilities will be included. Other account ID's will be ignored.
         * @example [1,2,3]
         */
        'accounts[]'?: number[];
      },
      params: RequestParams = {},
    ) =>
      this.request<
        InsightTransfer,
        | BadRequestResponse
        | UnauthenticatedResponse
        | NotFoundResponse
        | InternalExceptionResponse
      >({
        path: `/v1/insight/transfer/asset`,
        method: 'GET',
        query: query,
        secure: true,
        format: 'json',
        ...params,
      }),

    /**
     * @description This endpoint gives a summary of the expenses made by the user, grouped by (any) bill.
     *
     * @tags insight
     * @name InsightExpenseBill
     * @summary Insight into expenses, grouped by bill.
     * @request GET:/v1/insight/expense/bill
     * @secure
     */
    insightExpenseBill: (
      query: {
        /**
         * A date formatted YYYY-MM-DD.
         * @format date
         */
        start: string;
        /**
         * A date formatted YYYY-MM-DD.
         * @format date
         */
        end: string;
        /**
         * The bills to be included in the results.
         * @example [1,2,3]
         */
        'bills[]'?: number[];
        /**
         * The accounts to be included in the results. If you include ID's of asset accounts or liabilities, only withdrawals from those
         * asset accounts / liabilities will be included. Other account ID's will be ignored.
         * @example [1,2,3]
         */
        'accounts[]'?: number[];
      },
      params: RequestParams = {},
    ) =>
      this.request<
        InsightGroup,
        | BadRequestResponse
        | UnauthenticatedResponse
        | NotFoundResponse
        | InternalExceptionResponse
      >({
        path: `/v1/insight/expense/bill`,
        method: 'GET',
        query: query,
        secure: true,
        format: 'json',
        ...params,
      }),

    /**
     * @description This endpoint gives a summary of the expenses made by the user, including only expenses with no bill.
     *
     * @tags insight
     * @name InsightExpenseNoBill
     * @summary Insight into expenses, without bill.
     * @request GET:/v1/insight/expense/no-bill
     * @secure
     */
    insightExpenseNoBill: (
      query: {
        /**
         * A date formatted YYYY-MM-DD.
         * @format date
         */
        start: string;
        /**
         * A date formatted YYYY-MM-DD.
         * @format date
         */
        end: string;
        /**
         * The accounts to be included in the results. If you include ID's of asset accounts or liabilities, only withdrawals from those
         * asset accounts / liabilities will be included. Other account ID's will be ignored.
         * @example [1,2,3]
         */
        'accounts[]'?: number[];
      },
      params: RequestParams = {},
    ) =>
      this.request<
        InsightTotal,
        | BadRequestResponse
        | UnauthenticatedResponse
        | NotFoundResponse
        | InternalExceptionResponse
      >({
        path: `/v1/insight/expense/no-bill`,
        method: 'GET',
        query: query,
        secure: true,
        format: 'json',
        ...params,
      }),

    /**
     * @description This endpoint gives a summary of the expenses made by the user, grouped by (any) budget.
     *
     * @tags insight
     * @name InsightExpenseBudget
     * @summary Insight into expenses, grouped by budget.
     * @request GET:/v1/insight/expense/budget
     * @secure
     */
    insightExpenseBudget: (
      query: {
        /**
         * A date formatted YYYY-MM-DD.
         * @format date
         */
        start: string;
        /**
         * A date formatted YYYY-MM-DD.
         * @format date
         */
        end: string;
        /**
         * The budgets to be included in the results.
         * @example [1,2,3]
         */
        'budgets[]'?: number[];
        /**
         * The accounts to be included in the results. If you include ID's of asset accounts or liabilities, only withdrawals from those
         * asset accounts / liabilities will be included. Other account ID's will be ignored.
         * @example [1,2,3]
         */
        'accounts[]'?: number[];
      },
      params: RequestParams = {},
    ) =>
      this.request<
        InsightGroup,
        | BadRequestResponse
        | UnauthenticatedResponse
        | NotFoundResponse
        | InternalExceptionResponse
      >({
        path: `/v1/insight/expense/budget`,
        method: 'GET',
        query: query,
        secure: true,
        format: 'json',
        ...params,
      }),

    /**
     * @description This endpoint gives a summary of the expenses made by the user, including only expenses with no budget.
     *
     * @tags insight
     * @name InsightExpenseNoBudget
     * @summary Insight into expenses, without budget.
     * @request GET:/v1/insight/expense/no-budget
     * @secure
     */
    insightExpenseNoBudget: (
      query: {
        /**
         * A date formatted YYYY-MM-DD.
         * @format date
         */
        start: string;
        /**
         * A date formatted YYYY-MM-DD.
         * @format date
         */
        end: string;
        /**
         * The accounts to be included in the results. If you include ID's of asset accounts or liabilities, only withdrawals from those
         * asset accounts / liabilities will be included. Other account ID's will be ignored.
         * @example [1,2,3]
         */
        'accounts[]'?: number[];
      },
      params: RequestParams = {},
    ) =>
      this.request<
        InsightTotal,
        | BadRequestResponse
        | UnauthenticatedResponse
        | NotFoundResponse
        | InternalExceptionResponse
      >({
        path: `/v1/insight/expense/no-budget`,
        method: 'GET',
        query: query,
        secure: true,
        format: 'json',
        ...params,
      }),

    /**
     * @description This endpoint gives a summary of the expenses made by the user, grouped by (any) category.
     *
     * @tags insight
     * @name InsightExpenseCategory
     * @summary Insight into expenses, grouped by category.
     * @request GET:/v1/insight/expense/category
     * @secure
     */
    insightExpenseCategory: (
      query: {
        /**
         * A date formatted YYYY-MM-DD.
         * @format date
         */
        start: string;
        /**
         * A date formatted YYYY-MM-DD.
         * @format date
         */
        end: string;
        /**
         * The categories to be included in the results.
         * @example [1,2,3]
         */
        'categories[]'?: number[];
        /**
         * The accounts to be included in the results. If you include ID's of asset accounts or liabilities, only withdrawals from those
         * asset accounts / liabilities will be included. Other account ID's will be ignored.
         * @example [1,2,3]
         */
        'accounts[]'?: number[];
      },
      params: RequestParams = {},
    ) =>
      this.request<
        InsightGroup,
        | BadRequestResponse
        | UnauthenticatedResponse
        | NotFoundResponse
        | InternalExceptionResponse
      >({
        path: `/v1/insight/expense/category`,
        method: 'GET',
        query: query,
        secure: true,
        format: 'json',
        ...params,
      }),

    /**
     * @description This endpoint gives a summary of the expenses made by the user, including only expenses with no category.
     *
     * @tags insight
     * @name InsightExpenseNoCategory
     * @summary Insight into expenses, without category.
     * @request GET:/v1/insight/expense/no-category
     * @secure
     */
    insightExpenseNoCategory: (
      query: {
        /**
         * A date formatted YYYY-MM-DD.
         * @format date
         */
        start: string;
        /**
         * A date formatted YYYY-MM-DD.
         * @format date
         */
        end: string;
        /**
         * The accounts to be included in the results. If you include ID's of asset accounts or liabilities, only withdrawals from those
         * asset accounts / liabilities will be included. Other account ID's will be ignored.
         * @example [1,2,3]
         */
        'accounts[]'?: number[];
      },
      params: RequestParams = {},
    ) =>
      this.request<
        InsightTotal,
        | BadRequestResponse
        | UnauthenticatedResponse
        | NotFoundResponse
        | InternalExceptionResponse
      >({
        path: `/v1/insight/expense/no-category`,
        method: 'GET',
        query: query,
        secure: true,
        format: 'json',
        ...params,
      }),

    /**
     * @description This endpoint gives a summary of the income received by the user, grouped by (any) category.
     *
     * @tags insight
     * @name InsightIncomeCategory
     * @summary Insight into income, grouped by category.
     * @request GET:/v1/insight/income/category
     * @secure
     */
    insightIncomeCategory: (
      query: {
        /**
         * A date formatted YYYY-MM-DD.
         * @format date
         */
        start: string;
        /**
         * A date formatted YYYY-MM-DD.
         * @format date
         */
        end: string;
        /**
         * The categories to be included in the results.
         * @example [1,2,3]
         */
        'categories[]'?: number[];
        /**
         * The accounts to be included in the results. If you include ID's of asset accounts or liabilities, only deposits to those
         * asset accounts / liabilities will be included. Other account ID's will be ignored.
         * @example [1,2,3]
         */
        'accounts[]'?: number[];
      },
      params: RequestParams = {},
    ) =>
      this.request<
        InsightGroup,
        | BadRequestResponse
        | UnauthenticatedResponse
        | NotFoundResponse
        | InternalExceptionResponse
      >({
        path: `/v1/insight/income/category`,
        method: 'GET',
        query: query,
        secure: true,
        format: 'json',
        ...params,
      }),

    /**
     * @description This endpoint gives a summary of the income received by the user, including only income with no category.
     *
     * @tags insight
     * @name InsightIncomeNoCategory
     * @summary Insight into income, without category.
     * @request GET:/v1/insight/income/no-category
     * @secure
     */
    insightIncomeNoCategory: (
      query: {
        /**
         * A date formatted YYYY-MM-DD.
         * @format date
         */
        start: string;
        /**
         * A date formatted YYYY-MM-DD.
         * @format date
         */
        end: string;
        /**
         * The accounts to be included in the results. If you include ID's of asset accounts or liabilities, only deposits to those
         * asset accounts / liabilities will be included. Other account ID's will be ignored.
         * @example [1,2,3]
         */
        'accounts[]'?: number[];
      },
      params: RequestParams = {},
    ) =>
      this.request<
        InsightTotal,
        | BadRequestResponse
        | UnauthenticatedResponse
        | NotFoundResponse
        | InternalExceptionResponse
      >({
        path: `/v1/insight/income/no-category`,
        method: 'GET',
        query: query,
        secure: true,
        format: 'json',
        ...params,
      }),

    /**
     * @description This endpoint gives a summary of the transfers made by the user, grouped by (any) category.
     *
     * @tags insight
     * @name InsightTransferCategory
     * @summary Insight into transfers, grouped by category.
     * @request GET:/v1/insight/transfer/category
     * @secure
     */
    insightTransferCategory: (
      query: {
        /**
         * A date formatted YYYY-MM-DD.
         * @format date
         */
        start: string;
        /**
         * A date formatted YYYY-MM-DD.
         * @format date
         */
        end: string;
        /**
         * The categories to be included in the results.
         * @example [1,2,3]
         */
        'categories[]'?: number[];
        /**
         * The accounts to be included in the results. If you include ID's of asset accounts or liabilities, only transfers between those
         * asset accounts / liabilities will be included. Other account ID's will be ignored.
         * @example [1,2,3]
         */
        'accounts[]'?: number[];
      },
      params: RequestParams = {},
    ) =>
      this.request<
        InsightGroup,
        | BadRequestResponse
        | UnauthenticatedResponse
        | NotFoundResponse
        | InternalExceptionResponse
      >({
        path: `/v1/insight/transfer/category`,
        method: 'GET',
        query: query,
        secure: true,
        format: 'json',
        ...params,
      }),

    /**
     * @description This endpoint gives a summary of the transfers made by the user, including only transfers with no category.
     *
     * @tags insight
     * @name InsightTransferNoCategory
     * @summary Insight into transfers, without category.
     * @request GET:/v1/insight/transfer/no-category
     * @secure
     */
    insightTransferNoCategory: (
      query: {
        /**
         * A date formatted YYYY-MM-DD.
         * @format date
         */
        start: string;
        /**
         * A date formatted YYYY-MM-DD.
         * @format date
         */
        end: string;
        /**
         * The accounts to be included in the results. If you include ID's of asset accounts or liabilities, only transfers between those
         * asset accounts / liabilities will be included. Other account ID's will be ignored.
         * @example [1,2,3]
         */
        'accounts[]'?: number[];
      },
      params: RequestParams = {},
    ) =>
      this.request<
        InsightTotal,
        | BadRequestResponse
        | UnauthenticatedResponse
        | NotFoundResponse
        | InternalExceptionResponse
      >({
        path: `/v1/insight/transfer/no-category`,
        method: 'GET',
        query: query,
        secure: true,
        format: 'json',
        ...params,
      }),

    /**
     * @description This endpoint gives a summary of the expenses made by the user, grouped by (any) tag.
     *
     * @tags insight
     * @name InsightExpenseTag
     * @summary Insight into expenses, grouped by tag.
     * @request GET:/v1/insight/expense/tag
     * @secure
     */
    insightExpenseTag: (
      query: {
        /**
         * A date formatted YYYY-MM-DD.
         * @format date
         */
        start: string;
        /**
         * A date formatted YYYY-MM-DD.
         * @format date
         */
        end: string;
        /**
         * The tags to be included in the results.
         * @example [1,2,3]
         */
        'tags[]'?: number[];
        /**
         * The accounts to be included in the results. If you include ID's of asset accounts or liabilities, only withdrawals from those
         * asset accounts / liabilities will be included. Other account ID's will be ignored.
         * @example [1,2,3]
         */
        'accounts[]'?: number[];
      },
      params: RequestParams = {},
    ) =>
      this.request<
        InsightGroup,
        | BadRequestResponse
        | UnauthenticatedResponse
        | NotFoundResponse
        | InternalExceptionResponse
      >({
        path: `/v1/insight/expense/tag`,
        method: 'GET',
        query: query,
        secure: true,
        format: 'json',
        ...params,
      }),

    /**
     * @description This endpoint gives a summary of the expenses made by the user, including only expenses with no tag.
     *
     * @tags insight
     * @name InsightExpenseNoTag
     * @summary Insight into expenses, without tag.
     * @request GET:/v1/insight/expense/no-tag
     * @secure
     */
    insightExpenseNoTag: (
      query: {
        /**
         * A date formatted YYYY-MM-DD.
         * @format date
         */
        start: string;
        /**
         * A date formatted YYYY-MM-DD.
         * @format date
         */
        end: string;
        /**
         * The accounts to be included in the results. If you include ID's of asset accounts or liabilities, only withdrawals from those
         * asset accounts / liabilities will be included. Other account ID's will be ignored.
         * @example [1,2,3]
         */
        'accounts[]'?: number[];
      },
      params: RequestParams = {},
    ) =>
      this.request<
        InsightTotal,
        | BadRequestResponse
        | UnauthenticatedResponse
        | NotFoundResponse
        | InternalExceptionResponse
      >({
        path: `/v1/insight/expense/no-tag`,
        method: 'GET',
        query: query,
        secure: true,
        format: 'json',
        ...params,
      }),

    /**
     * @description This endpoint gives a summary of the income received by the user, grouped by (any) tag.
     *
     * @tags insight
     * @name InsightIncomeTag
     * @summary Insight into income, grouped by tag.
     * @request GET:/v1/insight/income/tag
     * @secure
     */
    insightIncomeTag: (
      query: {
        /**
         * A date formatted YYYY-MM-DD.
         * @format date
         */
        start: string;
        /**
         * A date formatted YYYY-MM-DD.
         * @format date
         */
        end: string;
        /**
         * The tags to be included in the results.
         * @example [1,2,3]
         */
        'tags[]'?: number[];
        /**
         * The accounts to be included in the results. If you include ID's of asset accounts or liabilities, only deposits to those
         * asset accounts / liabilities will be included. Other account ID's will be ignored.
         * @example [1,2,3]
         */
        'accounts[]'?: number[];
      },
      params: RequestParams = {},
    ) =>
      this.request<
        InsightGroup,
        | BadRequestResponse
        | UnauthenticatedResponse
        | NotFoundResponse
        | InternalExceptionResponse
      >({
        path: `/v1/insight/income/tag`,
        method: 'GET',
        query: query,
        secure: true,
        format: 'json',
        ...params,
      }),

    /**
     * @description This endpoint gives a summary of the income received by the user, including only income with no tag.
     *
     * @tags insight
     * @name InsightIncomeNoTag
     * @summary Insight into income, without tag.
     * @request GET:/v1/insight/income/no-tag
     * @secure
     */
    insightIncomeNoTag: (
      query: {
        /**
         * A date formatted YYYY-MM-DD.
         * @format date
         */
        start: string;
        /**
         * A date formatted YYYY-MM-DD.
         * @format date
         */
        end: string;
        /**
         * The accounts to be included in the results. If you include ID's of asset accounts or liabilities, only deposits to those
         * asset accounts / liabilities will be included. Other account ID's will be ignored.
         * @example [1,2,3]
         */
        'accounts[]'?: number[];
      },
      params: RequestParams = {},
    ) =>
      this.request<
        InsightTotal,
        | BadRequestResponse
        | UnauthenticatedResponse
        | NotFoundResponse
        | InternalExceptionResponse
      >({
        path: `/v1/insight/income/no-tag`,
        method: 'GET',
        query: query,
        secure: true,
        format: 'json',
        ...params,
      }),

    /**
     * @description This endpoint gives a summary of the transfers created by the user, grouped by (any) tag.
     *
     * @tags insight
     * @name InsightTransferTag
     * @summary Insight into transfers, grouped by tag.
     * @request GET:/v1/insight/transfer/tag
     * @secure
     */
    insightTransferTag: (
      query: {
        /**
         * A date formatted YYYY-MM-DD.
         * @format date
         */
        start: string;
        /**
         * A date formatted YYYY-MM-DD.
         * @format date
         */
        end: string;
        /**
         * The tags to be included in the results.
         * @example [1,2,3]
         */
        'tags[]'?: number[];
        /**
         * The accounts to be included in the results. If you include ID's of asset accounts or liabilities, only transfers between those
         * asset accounts / liabilities will be included. Other account ID's will be ignored.
         * @example [1,2,3]
         */
        'accounts[]'?: number[];
      },
      params: RequestParams = {},
    ) =>
      this.request<
        InsightGroup,
        | BadRequestResponse
        | UnauthenticatedResponse
        | NotFoundResponse
        | InternalExceptionResponse
      >({
        path: `/v1/insight/transfer/tag`,
        method: 'GET',
        query: query,
        secure: true,
        format: 'json',
        ...params,
      }),

    /**
     * @description This endpoint gives a summary of the transfers made by the user, including only transfers with no tag.
     *
     * @tags insight
     * @name InsightTransferNoTag
     * @summary Insight into expenses, without tag.
     * @request GET:/v1/insight/transfer/no-tag
     * @secure
     */
    insightTransferNoTag: (
      query: {
        /**
         * A date formatted YYYY-MM-DD.
         * @format date
         */
        start: string;
        /**
         * A date formatted YYYY-MM-DD.
         * @format date
         */
        end: string;
        /**
         * The accounts to be included in the results. If you include ID's of asset accounts or liabilities, only transfers from those
         * asset accounts / liabilities will be included. Other account ID's will be ignored.
         * @example [1,2,3]
         */
        'accounts[]'?: number[];
      },
      params: RequestParams = {},
    ) =>
      this.request<
        InsightTotal,
        | BadRequestResponse
        | UnauthenticatedResponse
        | NotFoundResponse
        | InternalExceptionResponse
      >({
        path: `/v1/insight/transfer/no-tag`,
        method: 'GET',
        query: query,
        secure: true,
        format: 'json',
        ...params,
      }),

    /**
     * @description This endpoint gives a sum of the total expenses made by the user.
     *
     * @tags insight
     * @name InsightExpenseTotal
     * @summary Insight into total expenses.
     * @request GET:/v1/insight/expense/total
     * @secure
     */
    insightExpenseTotal: (
      query: {
        /**
         * A date formatted YYYY-MM-DD.
         * @format date
         */
        start: string;
        /**
         * A date formatted YYYY-MM-DD.
         * @format date
         */
        end: string;
        /**
         * The accounts to be included in the results. If you include ID's of asset accounts or liabilities, only withdrawals from those
         * asset accounts / liabilities will be included. Other account ID's will be ignored.
         * @example [1,2,3]
         */
        'accounts[]'?: number[];
      },
      params: RequestParams = {},
    ) =>
      this.request<
        InsightTotal,
        | BadRequestResponse
        | UnauthenticatedResponse
        | NotFoundResponse
        | InternalExceptionResponse
      >({
        path: `/v1/insight/expense/total`,
        method: 'GET',
        query: query,
        secure: true,
        format: 'json',
        ...params,
      }),

    /**
     * @description This endpoint gives a sum of the total income received by the user.
     *
     * @tags insight
     * @name InsightIncomeTotal
     * @summary Insight into total income.
     * @request GET:/v1/insight/income/total
     * @secure
     */
    insightIncomeTotal: (
      query: {
        /**
         * A date formatted YYYY-MM-DD.
         * @format date
         */
        start: string;
        /**
         * A date formatted YYYY-MM-DD.
         * @format date
         */
        end: string;
        /**
         * The accounts to be included in the results. If you include ID's of asset accounts or liabilities, only deposits to those
         * asset accounts / liabilities will be included. Other account ID's will be ignored.
         * @example [1,2,3]
         */
        'accounts[]'?: number[];
      },
      params: RequestParams = {},
    ) =>
      this.request<
        InsightTotal,
        | BadRequestResponse
        | UnauthenticatedResponse
        | NotFoundResponse
        | InternalExceptionResponse
      >({
        path: `/v1/insight/income/total`,
        method: 'GET',
        query: query,
        secure: true,
        format: 'json',
        ...params,
      }),

    /**
     * @description This endpoint gives a sum of the total amount transfers made by the user.
     *
     * @tags insight
     * @name InsightTransferTotal
     * @summary Insight into total transfers.
     * @request GET:/v1/insight/transfer/total
     * @secure
     */
    insightTransferTotal: (
      query: {
        /**
         * A date formatted YYYY-MM-DD.
         * @format date
         */
        start: string;
        /**
         * A date formatted YYYY-MM-DD.
         * @format date
         */
        end: string;
        /**
         * The accounts to be included in the results. If you include ID's of asset accounts or liabilities, only transfers between those
         * asset accounts / liabilities will be included. Other account ID's will be ignored.
         * @example [1,2,3]
         */
        'accounts[]'?: number[];
      },
      params: RequestParams = {},
    ) =>
      this.request<
        InsightTotal,
        | BadRequestResponse
        | UnauthenticatedResponse
        | NotFoundResponse
        | InternalExceptionResponse
      >({
        path: `/v1/insight/transfer/total`,
        method: 'GET',
        query: query,
        secure: true,
        format: 'json',
        ...params,
      }),

    /**
     * @description This endpoint returns a list of all the transactions connected to the account.
     *
     * @tags accounts
     * @name ListTransactionByAccount
     * @summary List all transactions related to the account.
     * @request GET:/v1/accounts/{id}/transactions
     * @secure
     */
    listTransactionByAccount: (
      id: string,
      query?: {
        /**
         * Number of items per page. The default pagination is per 50 items.
         * @format int32
         * @example 10
         */
        limit?: number;
        /**
         * Page number. The default pagination is per 50 items.
         * @format int32
         * @example 1
         */
        page?: number;
        /**
         * A date formatted YYYY-MM-DD.
         * @format date
         * @example "2018-09-17"
         */
        start?: string;
        /**
         * A date formatted YYYY-MM-DD.
         * @format date
         * @example "2018-09-17"
         */
        end?: string;
        /** Optional filter on the transaction type(s) returned. */
        type?: TransactionTypeFilter;
      },
      params: RequestParams = {},
    ) =>
      this.request<
        TransactionArray,
        | BadRequestResponse
        | UnauthenticatedResponse
        | NotFoundResponse
        | InternalExceptionResponse
      >({
        path: `/v1/accounts/${id}/transactions`,
        method: 'GET',
        query: query,
        secure: true,
        format: 'json',
        ...params,
      }),

    /**
     * @description Lists all attachments.
     *
     * @tags accounts
     * @name ListAttachmentByAccount
     * @summary Lists all attachments.
     * @request GET:/v1/accounts/{id}/attachments
     * @secure
     */
    listAttachmentByAccount: (
      id: string,
      query?: {
        /**
         * Number of items per page. The default pagination is per 50 items.
         * @format int32
         * @example 10
         */
        limit?: number;
        /**
         * Page number. The default pagination is per 50 items.
         * @format int32
         * @example 1
         */
        page?: number;
      },
      params: RequestParams = {},
    ) =>
      this.request<
        AttachmentArray,
        | BadRequestResponse
        | UnauthenticatedResponse
        | NotFoundResponse
        | InternalExceptionResponse
      >({
        path: `/v1/accounts/${id}/attachments`,
        method: 'GET',
        query: query,
        secure: true,
        format: 'json',
        ...params,
      }),

    /**
     * @description This endpoint returns a list of all the piggy banks connected to the account.
     *
     * @tags accounts
     * @name ListPiggyBankByAccount
     * @summary List all piggy banks related to the account.
     * @request GET:/v1/accounts/{id}/piggy-banks
     * @secure
     */
    listPiggyBankByAccount: (
      id: string,
      query?: {
        /**
         * Number of items per page. The default pagination is per 50 items.
         * @format int32
         * @example 10
         */
        limit?: number;
        /**
         * Page number. The default pagination is per 50 items.
         * @format int32
         * @example 1
         */
        page?: number;
      },
      params: RequestParams = {},
    ) =>
      this.request<
        PiggyBankArray,
        | BadRequestResponse
        | UnauthenticatedResponse
        | NotFoundResponse
        | InternalExceptionResponse
      >({
        path: `/v1/accounts/${id}/piggy-banks`,
        method: 'GET',
        query: query,
        secure: true,
        format: 'json',
        ...params,
      }),

    /**
     * @description This endpoint returns a list of all the accounts owned by the authenticated user.
     *
     * @tags accounts
     * @name ListAccount
     * @summary List all accounts.
     * @request GET:/v1/accounts
     * @secure
     */
    listAccount: (
      query?: {
        /**
         * Number of items per page. The default pagination is per 50 items.
         * @format int32
         * @example 10
         */
        limit?: number;
        /**
         * Page number. The default pagination is per 50 items.
         * @format int32
         * @example 1
         */
        page?: number;
        /**
         * A date formatted YYYY-MM-DD. When added to the request, Firefly III will show the account's balance on that day.
         * @format date
         */
        date?: string;
        /** Optional filter on the account type(s) returned */
        type?: AccountTypeFilter;
      },
      params: RequestParams = {},
    ) =>
      this.request<
        AccountArray,
        | BadRequestResponse
        | UnauthenticatedResponse
        | NotFoundResponse
        | InternalExceptionResponse
      >({
        path: `/v1/accounts`,
        method: 'GET',
        query: query,
        secure: true,
        format: 'json',
        ...params,
      }),

    /**
     * @description Creates a new account. The data required can be submitted as a JSON body or as a list of parameters (in key=value pairs, like a webform).
     *
     * @tags accounts
     * @name StoreAccount
     * @summary Create new account.
     * @request POST:/v1/accounts
     * @secure
     */
    storeAccount: (data: AccountStore, params: RequestParams = {}) =>
      this.request<
        AccountSingle,
        | BadRequestResponse
        | UnauthenticatedResponse
        | NotFoundResponse
        | ValidationErrorResponse
        | InternalExceptionResponse
      >({
        path: `/v1/accounts`,
        method: 'POST',
        body: data,
        secure: true,
        type: ContentType.Json,
        format: 'json',
        ...params,
      }),

    /**
     * @description Returns a single account by its ID.
     *
     * @tags accounts
     * @name GetAccount
     * @summary Get single account.
     * @request GET:/v1/accounts/{id}
     * @secure
     */
    getAccount: (
      id: string,
      query?: {
        /**
         * A date formatted YYYY-MM-DD. When added to the request, Firefly III will show the account's balance on that day.
         * @format date
         */
        date?: string;
      },
      params: RequestParams = {},
    ) =>
      this.request<
        AccountSingle,
        | BadRequestResponse
        | UnauthenticatedResponse
        | NotFoundResponse
        | InternalExceptionResponse
      >({
        path: `/v1/accounts/${id}`,
        method: 'GET',
        query: query,
        secure: true,
        format: 'json',
        ...params,
      }),

    /**
     * @description Used to update a single account. All fields that are not submitted will be cleared (set to NULL). The model will tell you which fields are mandatory.
     *
     * @tags accounts
     * @name UpdateAccount
     * @summary Update existing account.
     * @request PUT:/v1/accounts/{id}
     * @secure
     */
    updateAccount: (
      id: string,
      data: AccountUpdate,
      params: RequestParams = {},
    ) =>
      this.request<
        AccountSingle,
        | BadRequestResponse
        | UnauthenticatedResponse
        | NotFoundResponse
        | ValidationErrorResponse
        | InternalExceptionResponse
      >({
        path: `/v1/accounts/${id}`,
        method: 'PUT',
        body: data,
        secure: true,
        type: ContentType.Json,
        format: 'json',
        ...params,
      }),

    /**
     * @description Will permanently delete an account. Any associated transactions and piggy banks are ALSO deleted. Cannot be recovered from.
     *
     * @tags accounts
     * @name DeleteAccount
     * @summary Permanently delete account.
     * @request DELETE:/v1/accounts/{id}
     * @secure
     */
    deleteAccount: (id: string, params: RequestParams = {}) =>
      this.request<
        void,
        | BadRequestResponse
        | UnauthenticatedResponse
        | NotFoundResponse
        | InternalExceptionResponse
      >({
        path: `/v1/accounts/${id}`,
        method: 'DELETE',
        secure: true,
        ...params,
      }),

    /**
     * @description This endpoint lists all attachments.
     *
     * @tags attachments
     * @name ListAttachment
     * @summary List all attachments.
     * @request GET:/v1/attachments
     * @secure
     */
    listAttachment: (
      query?: {
        /**
         * Number of items per page. The default pagination is per 50 items.
         * @format int32
         * @example 10
         */
        limit?: number;
        /**
         * Page number. The default pagination is per 50 items.
         * @format int32
         * @example 1
         */
        page?: number;
      },
      params: RequestParams = {},
    ) =>
      this.request<
        AttachmentArray,
        | BadRequestResponse
        | UnauthenticatedResponse
        | NotFoundResponse
        | InternalExceptionResponse
      >({
        path: `/v1/attachments`,
        method: 'GET',
        query: query,
        secure: true,
        format: 'json',
        ...params,
      }),

    /**
     * @description Creates a new attachment. The data required can be submitted as a JSON body or as a list of parameters. You cannot use this endpoint to upload the actual file data (see below). This endpoint only creates the attachment object.
     *
     * @tags attachments
     * @name StoreAttachment
     * @summary Store a new attachment.
     * @request POST:/v1/attachments
     * @secure
     */
    storeAttachment: (data: AttachmentStore, params: RequestParams = {}) =>
      this.request<
        AttachmentSingle,
        | BadRequestResponse
        | UnauthenticatedResponse
        | NotFoundResponse
        | ValidationErrorResponse
        | InternalExceptionResponse
      >({
        path: `/v1/attachments`,
        method: 'POST',
        body: data,
        secure: true,
        type: ContentType.Json,
        format: 'json',
        ...params,
      }),

    /**
     * @description Get a single attachment. This endpoint only returns the available metadata for the attachment. Actual file data is handled in two other endpoints (see below).
     *
     * @tags attachments
     * @name GetAttachment
     * @summary Get a single attachment.
     * @request GET:/v1/attachments/{id}
     * @secure
     */
    getAttachment: (id: string, params: RequestParams = {}) =>
      this.request<
        AttachmentSingle,
        | BadRequestResponse
        | UnauthenticatedResponse
        | NotFoundResponse
        | InternalExceptionResponse
      >({
        path: `/v1/attachments/${id}`,
        method: 'GET',
        secure: true,
        format: 'json',
        ...params,
      }),

    /**
     * @description Update the meta data for an existing attachment. This endpoint does not allow you to upload or download data. For that, see below.
     *
     * @tags attachments
     * @name UpdateAttachment
     * @summary Update existing attachment.
     * @request PUT:/v1/attachments/{id}
     * @secure
     */
    updateAttachment: (
      id: string,
      data: AttachmentUpdate,
      params: RequestParams = {},
    ) =>
      this.request<
        AttachmentSingle,
        | BadRequestResponse
        | UnauthenticatedResponse
        | NotFoundResponse
        | ValidationErrorResponse
        | InternalExceptionResponse
      >({
        path: `/v1/attachments/${id}`,
        method: 'PUT',
        body: data,
        secure: true,
        type: ContentType.Json,
        format: 'json',
        ...params,
      }),

    /**
     * @description With this endpoint you delete an attachment, including any stored file data.
     *
     * @tags attachments
     * @name DeleteAttachment
     * @summary Delete an attachment.
     * @request DELETE:/v1/attachments/{id}
     * @secure
     */
    deleteAttachment: (id: string, params: RequestParams = {}) =>
      this.request<
        void,
        | BadRequestResponse
        | UnauthenticatedResponse
        | NotFoundResponse
        | InternalExceptionResponse
      >({
        path: `/v1/attachments/${id}`,
        method: 'DELETE',
        secure: true,
        ...params,
      }),

    /**
     * @description This endpoint allows you to download the binary content of a transaction. It will be sent to you as a download, using the content type "application/octet-stream" and content disposition "attachment; filename=example.pdf".
     *
     * @tags attachments
     * @name DownloadAttachment
     * @summary Download a single attachment.
     * @request GET:/v1/attachments/{id}/download
     * @secure
     */
    downloadAttachment: (id: string, params: RequestParams = {}) =>
      this.request<
        File,
        | BadRequestResponse
        | UnauthenticatedResponse
        | NotFoundResponse
        | InternalExceptionResponse
      >({
        path: `/v1/attachments/${id}/download`,
        method: 'GET',
        secure: true,
        ...params,
      }),

    /**
     * @description Use this endpoint to upload (and possible overwrite) the file contents of an attachment. Simply put the entire file in the body as binary data.
     *
     * @tags attachments
     * @name UploadAttachment
     * @summary Upload an attachment.
     * @request POST:/v1/attachments/{id}/upload
     * @secure
     */
    uploadAttachment: (id: string, data: File, params: RequestParams = {}) =>
      this.request<
        void,
        | BadRequestResponse
        | UnauthenticatedResponse
        | NotFoundResponse
        | ValidationErrorResponse
        | InternalExceptionResponse
      >({
        path: `/v1/attachments/${id}/upload`,
        method: 'POST',
        body: data,
        secure: true,
        ...params,
      }),

    /**
     * @description Firefly III allows users to set the amount that is available to be budgeted in so-called "available budgets". For example, the user could have 1200,- available to be divided during the coming month. This amount is used on the /budgets page. This endpoint returns all of these amounts and the periods for which they are set.
     *
     * @tags available_budgets
     * @name ListAvailableBudget
     * @summary List all available budget amounts.
     * @request GET:/v1/available-budgets
     * @secure
     */
    listAvailableBudget: (
      query?: {
        /**
         * Number of items per page. The default pagination is per 50 items.
         * @format int32
         * @example 10
         */
        limit?: number;
        /**
         * Page number. The default pagination is per 50 items.
         * @format int32
         * @example 1
         */
        page?: number;
        /**
         * A date formatted YYYY-MM-DD.
         * @format date
         * @example "2018-09-17"
         */
        start?: string;
        /**
         * A date formatted YYYY-MM-DD.
         * @format date
         * @example "2018-12-31"
         */
        end?: string;
      },
      params: RequestParams = {},
    ) =>
      this.request<
        AvailableBudgetArray,
        | BadRequestResponse
        | UnauthenticatedResponse
        | NotFoundResponse
        | InternalExceptionResponse
      >({
        path: `/v1/available-budgets`,
        method: 'GET',
        query: query,
        secure: true,
        format: 'json',
        ...params,
      }),

    /**
     * @description Get a single available budget, by ID.
     *
     * @tags available_budgets
     * @name GetAvailableBudget
     * @summary Get a single available budget.
     * @request GET:/v1/available-budgets/{id}
     * @secure
     */
    getAvailableBudget: (id: string, params: RequestParams = {}) =>
      this.request<
        AvailableBudgetSingle,
        | BadRequestResponse
        | UnauthenticatedResponse
        | NotFoundResponse
        | InternalExceptionResponse
      >({
        path: `/v1/available-budgets/${id}`,
        method: 'GET',
        secure: true,
        format: 'json',
        ...params,
      }),

    /**
     * @description This endpoint will list all attachments linked to the bill.
     *
     * @tags bills
     * @name ListAttachmentByBill
     * @summary List all attachments uploaded to the bill.
     * @request GET:/v1/bills/{id}/attachments
     * @secure
     */
    listAttachmentByBill: (
      id: string,
      query?: {
        /**
         * Number of items per page. The default pagination is per 50 items.
         * @format int32
         * @example 10
         */
        limit?: number;
        /**
         * Page number. The default pagination is per 50 items.
         * @format int32
         * @example 1
         */
        page?: number;
      },
      params: RequestParams = {},
    ) =>
      this.request<
        AttachmentArray,
        | BadRequestResponse
        | UnauthenticatedResponse
        | NotFoundResponse
        | InternalExceptionResponse
      >({
        path: `/v1/bills/${id}/attachments`,
        method: 'GET',
        query: query,
        secure: true,
        format: 'json',
        ...params,
      }),

    /**
     * @description This endpoint will list all rules that have an action to set the bill to this bill.
     *
     * @tags bills
     * @name ListRuleByBill
     * @summary List all rules associated with the bill.
     * @request GET:/v1/bills/{id}/rules
     * @secure
     */
    listRuleByBill: (id: string, params: RequestParams = {}) =>
      this.request<
        RuleArray,
        | BadRequestResponse
        | UnauthenticatedResponse
        | NotFoundResponse
        | InternalExceptionResponse
      >({
        path: `/v1/bills/${id}/rules`,
        method: 'GET',
        secure: true,
        format: 'json',
        ...params,
      }),

    /**
     * @description This endpoint will list all transactions linked to this bill.
     *
     * @tags bills
     * @name ListTransactionByBill
     * @summary List all transactions associated with the  bill.
     * @request GET:/v1/bills/{id}/transactions
     * @secure
     */
    listTransactionByBill: (
      id: string,
      query?: {
        /**
         * A date formatted YYYY-MM-DD.
         * @format date
         * @example "2018-09-17"
         */
        start?: string;
        /**
         * A date formatted YYYY-MM-DD.
         * @format date
         * @example "2018-12-31"
         */
        end?: string;
        /** Optional filter on the transaction type(s) returned */
        type?: TransactionTypeFilter;
      },
      params: RequestParams = {},
    ) =>
      this.request<
        TransactionArray,
        | BadRequestResponse
        | UnauthenticatedResponse
        | NotFoundResponse
        | InternalExceptionResponse
      >({
        path: `/v1/bills/${id}/transactions`,
        method: 'GET',
        query: query,
        secure: true,
        format: 'json',
        ...params,
      }),

    /**
     * @description This endpoint will list all the user's bills.
     *
     * @tags bills
     * @name ListBill
     * @summary List all bills.
     * @request GET:/v1/bills
     * @secure
     */
    listBill: (
      query?: {
        /**
         * Number of items per page. The default pagination is per 50 items.
         * @format int32
         * @example 10
         */
        limit?: number;
        /**
         * Page number. The default pagination is per 50 items.
         * @format int32
         * @example 1
         */
        page?: number;
        /**
         * A date formatted YYYY-MM-DD. If it is are added to the request, Firefly III will calculate the appropriate payment and paid dates.
         * @format date
         * @example "2018-09-17"
         */
        start?: string;
        /**
         * A date formatted YYYY-MM-DD. If it is added to the request, Firefly III will calculate the appropriate payment and paid dates.
         * @format date
         * @example "2018-12-31"
         */
        end?: string;
      },
      params: RequestParams = {},
    ) =>
      this.request<
        BillArray,
        | BadRequestResponse
        | UnauthenticatedResponse
        | NotFoundResponse
        | InternalExceptionResponse
      >({
        path: `/v1/bills`,
        method: 'GET',
        query: query,
        secure: true,
        format: 'json',
        ...params,
      }),

    /**
     * @description Creates a new bill. The data required can be submitted as a JSON body or as a list of parameters.
     *
     * @tags bills
     * @name StoreBill
     * @summary Store a new bill
     * @request POST:/v1/bills
     * @secure
     */
    storeBill: (data: BillStore, params: RequestParams = {}) =>
      this.request<
        BillSingle,
        | BadRequestResponse
        | UnauthenticatedResponse
        | NotFoundResponse
        | ValidationErrorResponse
        | InternalExceptionResponse
      >({
        path: `/v1/bills`,
        method: 'POST',
        body: data,
        secure: true,
        type: ContentType.Json,
        format: 'json',
        ...params,
      }),

    /**
     * @description Get a single bill.
     *
     * @tags bills
     * @name GetBill
     * @summary Get a single bill.
     * @request GET:/v1/bills/{id}
     * @secure
     */
    getBill: (
      id: string,
      query?: {
        /**
         * A date formatted YYYY-MM-DD. If it is are added to the request, Firefly III will calculate the appropriate payment and paid dates.
         * @format date
         * @example "2018-09-17"
         */
        start?: string;
        /**
         * A date formatted YYYY-MM-DD. If it is added to the request, Firefly III will calculate the appropriate payment and paid dates.
         * @format date
         * @example "2018-12-31"
         */
        end?: string;
      },
      params: RequestParams = {},
    ) =>
      this.request<
        BillSingle,
        | BadRequestResponse
        | UnauthenticatedResponse
        | NotFoundResponse
        | InternalExceptionResponse
      >({
        path: `/v1/bills/${id}`,
        method: 'GET',
        query: query,
        secure: true,
        format: 'json',
        ...params,
      }),

    /**
     * @description Update existing bill.
     *
     * @tags bills
     * @name UpdateBill
     * @summary Update existing bill.
     * @request PUT:/v1/bills/{id}
     * @secure
     */
    updateBill: (id: string, data: BillUpdate, params: RequestParams = {}) =>
      this.request<
        BillSingle,
        | BadRequestResponse
        | UnauthenticatedResponse
        | NotFoundResponse
        | ValidationErrorResponse
        | InternalExceptionResponse
      >({
        path: `/v1/bills/${id}`,
        method: 'PUT',
        body: data,
        secure: true,
        type: ContentType.Json,
        format: 'json',
        ...params,
      }),

    /**
     * @description Delete a bill. This will not delete any associated rules. Will not remove associated transactions. WILL remove all associated attachments.
     *
     * @tags bills
     * @name DeleteBill
     * @summary Delete a bill.
     * @request DELETE:/v1/bills/{id}
     * @secure
     */
    deleteBill: (id: string, params: RequestParams = {}) =>
      this.request<
        void,
        | BadRequestResponse
        | UnauthenticatedResponse
        | NotFoundResponse
        | InternalExceptionResponse
      >({
        path: `/v1/bills/${id}`,
        method: 'DELETE',
        secure: true,
        ...params,
      }),

    /**
     * @description List all the transactions within one budget limit. The start and end date are dictated by the budget limit.
     *
     * @tags budgets
     * @name ListTransactionByBudgetLimit
     * @summary List all transactions by a budget limit ID.
     * @request GET:/v1/budgets/{id}/limits/{limitId}/transactions
     * @secure
     */
    listTransactionByBudgetLimit: (
      id: string,
      limitId: string,
      query?: {
        /**
         * Number of items per page. The default pagination is per 50 items.
         * @format int32
         * @example 10
         */
        limit?: number;
        /**
         * Page number. The default pagination is per 50 items.
         * @format int32
         * @example 1
         */
        page?: number;
        /** Optional filter on the transaction type(s) returned */
        type?: TransactionTypeFilter;
      },
      params: RequestParams = {},
    ) =>
      this.request<
        TransactionArray,
        | BadRequestResponse
        | UnauthenticatedResponse
        | NotFoundResponse
        | InternalExceptionResponse
      >({
        path: `/v1/budgets/${id}/limits/${limitId}/transactions`,
        method: 'GET',
        query: query,
        secure: true,
        format: 'json',
        ...params,
      }),

    /**
     * @description Get all budget limits for this budget and the money spent, and money left. You can limit the list by submitting a date range as well. The "spent" array for each budget limit is NOT influenced by the start and end date of your query, but by the start and end date of the budget limit itself.
     *
     * @tags budgets
     * @name ListBudgetLimitByBudget
     * @summary Get all limits for a budget.
     * @request GET:/v1/budgets/{id}/limits
     * @secure
     */
    listBudgetLimitByBudget: (
      id: string,
      query?: {
        /**
         * A date formatted YYYY-MM-DD.
         * @format date
         * @example "2018-09-17"
         */
        start?: string;
        /**
         * A date formatted YYYY-MM-DD.
         * @format date
         * @example "2018-12-31"
         */
        end?: string;
      },
      params: RequestParams = {},
    ) =>
      this.request<
        BudgetLimitArray,
        | BadRequestResponse
        | UnauthenticatedResponse
        | NotFoundResponse
        | InternalExceptionResponse
      >({
        path: `/v1/budgets/${id}/limits`,
        method: 'GET',
        query: query,
        secure: true,
        format: 'json',
        ...params,
      }),

    /**
     * @description Store a new budget limit under this budget.
     *
     * @tags budgets
     * @name StoreBudgetLimit
     * @summary Store new budget limit.
     * @request POST:/v1/budgets/{id}/limits
     * @secure
     */
    storeBudgetLimit: (
      id: string,
      data: BudgetLimitStore,
      params: RequestParams = {},
    ) =>
      this.request<
        BudgetLimitSingle,
        | BadRequestResponse
        | UnauthenticatedResponse
        | NotFoundResponse
        | ValidationErrorResponse
        | InternalExceptionResponse
      >({
        path: `/v1/budgets/${id}/limits`,
        method: 'POST',
        body: data,
        secure: true,
        type: ContentType.Json,
        format: 'json',
        ...params,
      }),

    /**
     * No description
     *
     * @tags budgets
     * @name GetBudgetLimit
     * @summary Get single budget limit.
     * @request GET:/v1/budgets/{id}/limits/{limitId}
     * @secure
     */
    getBudgetLimit: (id: string, limitId: number, params: RequestParams = {}) =>
      this.request<
        BudgetLimitSingle,
        | BadRequestResponse
        | UnauthenticatedResponse
        | NotFoundResponse
        | InternalExceptionResponse
      >({
        path: `/v1/budgets/${id}/limits/${limitId}`,
        method: 'GET',
        secure: true,
        format: 'json',
        ...params,
      }),

    /**
     * @description Update existing budget limit.
     *
     * @tags budgets
     * @name UpdateBudgetLimit
     * @summary Update existing budget limit.
     * @request PUT:/v1/budgets/{id}/limits/{limitId}
     * @secure
     */
    updateBudgetLimit: (
      id: string,
      limitId: string,
      data: BudgetLimit,
      params: RequestParams = {},
    ) =>
      this.request<
        BudgetLimitSingle,
        | BadRequestResponse
        | UnauthenticatedResponse
        | NotFoundResponse
        | ValidationErrorResponse
        | InternalExceptionResponse
      >({
        path: `/v1/budgets/${id}/limits/${limitId}`,
        method: 'PUT',
        body: data,
        secure: true,
        type: ContentType.Json,
        format: 'json',
        ...params,
      }),

    /**
     * @description Delete a budget limit.
     *
     * @tags budgets
     * @name DeleteBudgetLimit
     * @summary Delete a budget limit.
     * @request DELETE:/v1/budgets/{id}/limits/{limitId}
     * @secure
     */
    deleteBudgetLimit: (
      id: string,
      limitId: string,
      params: RequestParams = {},
    ) =>
      this.request<
        void,
        | BadRequestResponse
        | UnauthenticatedResponse
        | NotFoundResponse
        | InternalExceptionResponse
      >({
        path: `/v1/budgets/${id}/limits/${limitId}`,
        method: 'DELETE',
        secure: true,
        ...params,
      }),

    /**
     * @description Get all budget limits for for this date range.
     *
     * @tags budgets
     * @name ListBudgetLimit
     * @summary Get list of budget limits by date
     * @request GET:/v1/budget-limits
     * @secure
     */
    listBudgetLimit: (
      query: {
        /**
         * A date formatted YYYY-MM-DD.
         * @format date
         * @example "2018-09-17"
         */
        start: string;
        /**
         * A date formatted YYYY-MM-DD.
         * @format date
         * @example "2018-12-31"
         */
        end: string;
      },
      params: RequestParams = {},
    ) =>
      this.request<
        BudgetLimitArray,
        | BadRequestResponse
        | UnauthenticatedResponse
        | NotFoundResponse
        | InternalExceptionResponse
      >({
        path: `/v1/budget-limits`,
        method: 'GET',
        query: query,
        secure: true,
        format: 'json',
        ...params,
      }),

    /**
     * @description Get all transactions linked to a budget, possibly limited by start and end
     *
     * @tags budgets
     * @name ListTransactionByBudget
     * @summary All transactions to a budget.
     * @request GET:/v1/budgets/{id}/transactions
     * @secure
     */
    listTransactionByBudget: (
      id: string,
      query?: {
        /**
         * Number of items per page. The default pagination is per 50 items.
         * @format int32
         * @example 10
         */
        limit?: number;
        /**
         * Page number. The default pagination is per 50 items.
         * @format int32
         * @example 1
         */
        page?: number;
        /**
         * A date formatted YYYY-MM-DD.
         * @format date
         * @example "2018-09-17"
         */
        start?: string;
        /**
         * A date formatted YYYY-MM-DD.
         * @format date
         * @example "2018-12-31"
         */
        end?: string;
        /** Optional filter on the transaction type(s) returned */
        type?: TransactionTypeFilter;
      },
      params: RequestParams = {},
    ) =>
      this.request<
        TransactionArray,
        | BadRequestResponse
        | UnauthenticatedResponse
        | NotFoundResponse
        | InternalExceptionResponse
      >({
        path: `/v1/budgets/${id}/transactions`,
        method: 'GET',
        query: query,
        secure: true,
        format: 'json',
        ...params,
      }),

    /**
     * @description Lists all attachments.
     *
     * @tags budgets
     * @name ListAttachmentByBudget
     * @summary Lists all attachments of a budget.
     * @request GET:/v1/budgets/{id}/attachments
     * @secure
     */
    listAttachmentByBudget: (
      id: string,
      query?: {
        /**
         * Number of items per page. The default pagination is per 50 items.
         * @format int32
         * @example 10
         */
        limit?: number;
        /**
         * Page number. The default pagination is per 50 items.
         * @format int32
         * @example 1
         */
        page?: number;
      },
      params: RequestParams = {},
    ) =>
      this.request<
        AttachmentArray,
        | BadRequestResponse
        | UnauthenticatedResponse
        | NotFoundResponse
        | InternalExceptionResponse
      >({
        path: `/v1/budgets/${id}/attachments`,
        method: 'GET',
        query: query,
        secure: true,
        format: 'json',
        ...params,
      }),

    /**
     * @description List all the budgets the user has made. If the start date and end date are submitted as well, the "spent" array will be updated accordingly.
     *
     * @tags budgets
     * @name ListBudget
     * @summary List all budgets.
     * @request GET:/v1/budgets
     * @secure
     */
    listBudget: (
      query?: {
        /**
         * Number of items per page. The default pagination is per 50 items.
         * @format int32
         * @example 10
         */
        limit?: number;
        /**
         * Page number. The default pagination is per 50 items.
         * @format int32
         * @example 1
         */
        page?: number;
        /**
         * A date formatted YYYY-MM-DD, to get info on how much the user has spent. You must submit both start and end.
         * @format date
         * @example "2018-09-17"
         */
        start?: string;
        /**
         * A date formatted YYYY-MM-DD, to get info on how much the user has spent. You must submit both start and end.
         * @format date
         * @example "2018-12-31"
         */
        end?: string;
      },
      params: RequestParams = {},
    ) =>
      this.request<
        BudgetArray,
        | BadRequestResponse
        | UnauthenticatedResponse
        | NotFoundResponse
        | InternalExceptionResponse
      >({
        path: `/v1/budgets`,
        method: 'GET',
        query: query,
        secure: true,
        format: 'json',
        ...params,
      }),

    /**
     * @description Creates a new budget. The data required can be submitted as a JSON body or as a list of parameters.
     *
     * @tags budgets
     * @name StoreBudget
     * @summary Store a new budget
     * @request POST:/v1/budgets
     * @secure
     */
    storeBudget: (data: BudgetStore, params: RequestParams = {}) =>
      this.request<
        BudgetSingle,
        | BadRequestResponse
        | UnauthenticatedResponse
        | NotFoundResponse
        | ValidationErrorResponse
        | InternalExceptionResponse
      >({
        path: `/v1/budgets`,
        method: 'POST',
        body: data,
        secure: true,
        type: ContentType.Json,
        format: 'json',
        ...params,
      }),

    /**
     * @description Get a single budget. If the start date and end date are submitted as well, the "spent" array will be updated accordingly.
     *
     * @tags budgets
     * @name GetBudget
     * @summary Get a single budget.
     * @request GET:/v1/budgets/{id}
     * @secure
     */
    getBudget: (
      id: string,
      query?: {
        /**
         * A date formatted YYYY-MM-DD, to get info on how much the user has spent.
         * @format date
         * @example "2018-09-17"
         */
        start?: string;
        /**
         * A date formatted YYYY-MM-DD, to get info on how much the user has spent.
         * @format date
         * @example "2018-12-31"
         */
        end?: string;
      },
      params: RequestParams = {},
    ) =>
      this.request<
        BudgetSingle,
        | BadRequestResponse
        | UnauthenticatedResponse
        | NotFoundResponse
        | InternalExceptionResponse
      >({
        path: `/v1/budgets/${id}`,
        method: 'GET',
        query: query,
        secure: true,
        format: 'json',
        ...params,
      }),

    /**
     * @description Update existing budget. This endpoint cannot be used to set budget amount limits.
     *
     * @tags budgets
     * @name UpdateBudget
     * @summary Update existing budget.
     * @request PUT:/v1/budgets/{id}
     * @secure
     */
    updateBudget: (
      id: string,
      data: BudgetUpdate,
      params: RequestParams = {},
    ) =>
      this.request<
        BudgetSingle,
        | BadRequestResponse
        | UnauthenticatedResponse
        | NotFoundResponse
        | ValidationErrorResponse
        | InternalExceptionResponse
      >({
        path: `/v1/budgets/${id}`,
        method: 'PUT',
        body: data,
        secure: true,
        type: ContentType.Json,
        format: 'json',
        ...params,
      }),

    /**
     * @description Delete a budget. Transactions will not be deleted.
     *
     * @tags budgets
     * @name DeleteBudget
     * @summary Delete a budget.
     * @request DELETE:/v1/budgets/{id}
     * @secure
     */
    deleteBudget: (id: string, params: RequestParams = {}) =>
      this.request<
        void,
        | BadRequestResponse
        | UnauthenticatedResponse
        | NotFoundResponse
        | InternalExceptionResponse
      >({
        path: `/v1/budgets/${id}`,
        method: 'DELETE',
        secure: true,
        ...params,
      }),

    /**
     * @description List all transactions in a category, optionally limited to the date ranges specified.
     *
     * @tags categories
     * @name ListTransactionByCategory
     * @summary List all transactions in a category.
     * @request GET:/v1/categories/{id}/transactions
     * @secure
     */
    listTransactionByCategory: (
      id: string,
      query?: {
        /**
         * Number of items per page. The default pagination is per 50 items.
         * @format int32
         * @example 10
         */
        limit?: number;
        /**
         * Page number. The default pagination is per 50 items.
         * @format int32
         * @example 1
         */
        page?: number;
        /**
         * A date formatted YYYY-MM-DD, to limit the result list.
         * @format date
         * @example "2018-09-17"
         */
        start?: string;
        /**
         * A date formatted YYYY-MM-DD, to limit the result list.
         * @format date
         * @example "2018-12-31"
         */
        end?: string;
        /** Optional filter on the transaction type(s) returned */
        type?: TransactionTypeFilter;
      },
      params: RequestParams = {},
    ) =>
      this.request<
        TransactionArray,
        | BadRequestResponse
        | UnauthenticatedResponse
        | NotFoundResponse
        | InternalExceptionResponse
      >({
        path: `/v1/categories/${id}/transactions`,
        method: 'GET',
        query: query,
        secure: true,
        format: 'json',
        ...params,
      }),

    /**
     * @description Lists all attachments.
     *
     * @tags categories
     * @name ListAttachmentByCategory
     * @summary Lists all attachments.
     * @request GET:/v1/categories/{id}/attachments
     * @secure
     */
    listAttachmentByCategory: (
      id: string,
      query?: {
        /**
         * Number of items per page. The default pagination is per 50 items.
         * @format int32
         * @example 10
         */
        limit?: number;
        /**
         * Page number. The default pagination is per 50 items.
         * @format int32
         * @example 1
         */
        page?: number;
      },
      params: RequestParams = {},
    ) =>
      this.request<
        AttachmentArray,
        | BadRequestResponse
        | UnauthenticatedResponse
        | NotFoundResponse
        | InternalExceptionResponse
      >({
        path: `/v1/categories/${id}/attachments`,
        method: 'GET',
        query: query,
        secure: true,
        format: 'json',
        ...params,
      }),

    /**
     * @description List all categories.
     *
     * @tags categories
     * @name ListCategory
     * @summary List all categories.
     * @request GET:/v1/categories
     * @secure
     */
    listCategory: (
      query?: {
        /**
         * Number of items per page. The default pagination is per 50 items.
         * @format int32
         * @example 10
         */
        limit?: number;
        /**
         * Page number. The default pagination is per 50 items.
         * @format int32
         * @example 1
         */
        page?: number;
      },
      params: RequestParams = {},
    ) =>
      this.request<
        CategoryArray,
        | BadRequestResponse
        | UnauthenticatedResponse
        | NotFoundResponse
        | InternalExceptionResponse
      >({
        path: `/v1/categories`,
        method: 'GET',
        query: query,
        secure: true,
        format: 'json',
        ...params,
      }),

    /**
     * @description Creates a new category. The data required can be submitted as a JSON body or as a list of parameters.
     *
     * @tags categories
     * @name StoreCategory
     * @summary Store a new category
     * @request POST:/v1/categories
     * @secure
     */
    storeCategory: (data: Category, params: RequestParams = {}) =>
      this.request<
        CategorySingle,
        | BadRequestResponse
        | UnauthenticatedResponse
        | NotFoundResponse
        | ValidationErrorResponse
        | InternalExceptionResponse
      >({
        path: `/v1/categories`,
        method: 'POST',
        body: data,
        secure: true,
        type: ContentType.Json,
        format: 'json',
        ...params,
      }),

    /**
     * @description Get a single category.
     *
     * @tags categories
     * @name GetCategory
     * @summary Get a single category.
     * @request GET:/v1/categories/{id}
     * @secure
     */
    getCategory: (
      id: string,
      query?: {
        /**
         * A date formatted YYYY-MM-DD, to show spent and earned info.
         * @format date
         * @example "2018-09-17"
         */
        start?: string;
        /**
         * A date formatted YYYY-MM-DD, to show spent and earned info.
         * @format date
         * @example "2018-12-31"
         */
        end?: string;
      },
      params: RequestParams = {},
    ) =>
      this.request<
        CategorySingle,
        | BadRequestResponse
        | UnauthenticatedResponse
        | NotFoundResponse
        | InternalExceptionResponse
      >({
        path: `/v1/categories/${id}`,
        method: 'GET',
        query: query,
        secure: true,
        format: 'json',
        ...params,
      }),

    /**
     * @description Update existing category.
     *
     * @tags categories
     * @name UpdateCategory
     * @summary Update existing category.
     * @request PUT:/v1/categories/{id}
     * @secure
     */
    updateCategory: (
      id: string,
      data: CategoryUpdate,
      params: RequestParams = {},
    ) =>
      this.request<
        CategorySingle,
        | BadRequestResponse
        | UnauthenticatedResponse
        | NotFoundResponse
        | ValidationErrorResponse
        | InternalExceptionResponse
      >({
        path: `/v1/categories/${id}`,
        method: 'PUT',
        body: data,
        secure: true,
        type: ContentType.Json,
        format: 'json',
        ...params,
      }),

    /**
     * @description Delete a category. Transactions will not be removed.
     *
     * @tags categories
     * @name DeleteCategory
     * @summary Delete a category.
     * @request DELETE:/v1/categories/{id}
     * @secure
     */
    deleteCategory: (id: string, params: RequestParams = {}) =>
      this.request<
        void,
        | BadRequestResponse
        | UnauthenticatedResponse
        | NotFoundResponse
        | InternalExceptionResponse
      >({
        path: `/v1/categories/${id}`,
        method: 'DELETE',
        secure: true,
        ...params,
      }),

    /**
     * @description List all transactions under this link type, both the inward and outward transactions.
     *
     * @tags links
     * @name ListTransactionByLinkType
     * @summary List all transactions under this link type.
     * @request GET:/v1/link-types/{id}/transactions
     * @secure
     */
    listTransactionByLinkType: (
      id: string,
      query?: {
        /**
         * Number of items per page. The default pagination is per 50 items.
         * @format int32
         * @example 10
         */
        limit?: number;
        /**
         * Page number. The default pagination is per 50 items.
         * @format int32
         * @example 1
         */
        page?: number;
        /**
         * A date formatted YYYY-MM-DD, to limit the results.
         * @format date
         * @example "2018-09-17"
         */
        start?: string;
        /**
         * A date formatted YYYY-MM-DD, to limit the results.
         * @format date
         * @example "2018-09-17"
         */
        end?: string;
        /** Optional filter on the transaction type(s) returned. */
        type?: TransactionTypeFilter;
      },
      params: RequestParams = {},
    ) =>
      this.request<
        TransactionArray,
        | BadRequestResponse
        | UnauthenticatedResponse
        | NotFoundResponse
        | InternalExceptionResponse
      >({
        path: `/v1/link-types/${id}/transactions`,
        method: 'GET',
        query: query,
        secure: true,
        format: 'json',
        ...params,
      }),

    /**
     * @description List all the link types the system has. These include the default ones as well as any new ones.
     *
     * @tags links
     * @name ListLinkType
     * @summary List all types of links.
     * @request GET:/v1/link-types
     * @secure
     */
    listLinkType: (
      query?: {
        /**
         * Number of items per page. The default pagination is per 50 items.
         * @format int32
         * @example 10
         */
        limit?: number;
        /**
         * Page number. The default pagination is per 50 items.
         * @format int32
         * @example 1
         */
        page?: number;
      },
      params: RequestParams = {},
    ) =>
      this.request<
        LinkTypeArray,
        | BadRequestResponse
        | UnauthenticatedResponse
        | NotFoundResponse
        | InternalExceptionResponse
      >({
        path: `/v1/link-types`,
        method: 'GET',
        query: query,
        secure: true,
        format: 'json',
        ...params,
      }),

    /**
     * @description Creates a new link type. The data required can be submitted as a JSON body or as a list of parameters (in key=value pairs, like a webform).
     *
     * @tags links
     * @name StoreLinkType
     * @summary Create a new link type
     * @request POST:/v1/link-types
     * @secure
     */
    storeLinkType: (data: LinkType, params: RequestParams = {}) =>
      this.request<
        LinkTypeSingle,
        | BadRequestResponse
        | UnauthenticatedResponse
        | NotFoundResponse
        | ValidationErrorResponse
        | InternalExceptionResponse
      >({
        path: `/v1/link-types`,
        method: 'POST',
        body: data,
        secure: true,
        type: ContentType.Json,
        format: 'json',
        ...params,
      }),

    /**
     * @description Returns a single link type by its ID.
     *
     * @tags links
     * @name GetLinkType
     * @summary Get single a link type.
     * @request GET:/v1/link-types/{id}
     * @secure
     */
    getLinkType: (id: string, params: RequestParams = {}) =>
      this.request<
        LinkTypeSingle,
        | BadRequestResponse
        | UnauthenticatedResponse
        | NotFoundResponse
        | InternalExceptionResponse
      >({
        path: `/v1/link-types/${id}`,
        method: 'GET',
        secure: true,
        format: 'json',
        ...params,
      }),

    /**
     * @description Used to update a single link type. All fields that are not submitted will be cleared (set to NULL). The model will tell you which fields are mandatory. You cannot update some of the system provided link types, indicated by the editable=false flag when you list it.
     *
     * @tags links
     * @name UpdateLinkType
     * @summary Update existing link type.
     * @request PUT:/v1/link-types/{id}
     * @secure
     */
    updateLinkType: (
      id: string,
      data: LinkTypeUpdate,
      params: RequestParams = {},
    ) =>
      this.request<
        LinkTypeSingle,
        | BadRequestResponse
        | UnauthenticatedResponse
        | NotFoundResponse
        | ValidationErrorResponse
        | InternalExceptionResponse
      >({
        path: `/v1/link-types/${id}`,
        method: 'PUT',
        body: data,
        secure: true,
        type: ContentType.Json,
        format: 'json',
        ...params,
      }),

    /**
     * @description Will permanently delete a link type. The links between transactions will be removed. The transactions themselves remain. You cannot delete some of the system provided link types, indicated by the editable=false flag when you list it.
     *
     * @tags links
     * @name DeleteLinkType
     * @summary Permanently delete link type.
     * @request DELETE:/v1/link-types/{id}
     * @secure
     */
    deleteLinkType: (id: string, params: RequestParams = {}) =>
      this.request<
        void,
        | BadRequestResponse
        | UnauthenticatedResponse
        | NotFoundResponse
        | InternalExceptionResponse
      >({
        path: `/v1/link-types/${id}`,
        method: 'DELETE',
        secure: true,
        ...params,
      }),

    /**
     * @description List all the transaction links.
     *
     * @tags links
     * @name ListTransactionLink
     * @summary List all transaction links.
     * @request GET:/v1/transaction-links
     * @secure
     */
    listTransactionLink: (
      query?: {
        /**
         * Number of items per page. The default pagination is per 50 items.
         * @format int32
         * @example 10
         */
        limit?: number;
        /**
         * Page number. The default pagination is per 50 items.
         * @format int32
         * @example 1
         */
        page?: number;
      },
      params: RequestParams = {},
    ) =>
      this.request<
        TransactionLinkArray,
        | BadRequestResponse
        | UnauthenticatedResponse
        | NotFoundResponse
        | InternalExceptionResponse
      >({
        path: `/v1/transaction-links`,
        method: 'GET',
        query: query,
        secure: true,
        format: 'json',
        ...params,
      }),

    /**
     * @description Store a new link between two transactions. For this end point you need the journal_id from a transaction.
     *
     * @tags links
     * @name StoreTransactionLink
     * @summary Create a new link between transactions
     * @request POST:/v1/transaction-links
     * @secure
     */
    storeTransactionLink: (
      data: TransactionLinkStore,
      params: RequestParams = {},
    ) =>
      this.request<
        TransactionLinkSingle,
        | BadRequestResponse
        | UnauthenticatedResponse
        | NotFoundResponse
        | ValidationErrorResponse
        | InternalExceptionResponse
      >({
        path: `/v1/transaction-links`,
        method: 'POST',
        body: data,
        secure: true,
        type: ContentType.Json,
        format: 'json',
        ...params,
      }),

    /**
     * @description Returns a single link by its ID.
     *
     * @tags links
     * @name GetTransactionLink
     * @summary Get a single link.
     * @request GET:/v1/transaction-links/{id}
     * @secure
     */
    getTransactionLink: (id: string, params: RequestParams = {}) =>
      this.request<
        TransactionLinkSingle,
        | BadRequestResponse
        | UnauthenticatedResponse
        | NotFoundResponse
        | InternalExceptionResponse
      >({
        path: `/v1/transaction-links/${id}`,
        method: 'GET',
        secure: true,
        format: 'json',
        ...params,
      }),

    /**
     * @description Will permanently delete link. Transactions remain.
     *
     * @tags links
     * @name DeleteTransactionLink
     * @summary Permanently delete link between transactions.
     * @request DELETE:/v1/transaction-links/{id}
     * @secure
     */
    deleteTransactionLink: (id: string, params: RequestParams = {}) =>
      this.request<
        void,
        | BadRequestResponse
        | UnauthenticatedResponse
        | NotFoundResponse
        | InternalExceptionResponse
      >({
        path: `/v1/transaction-links/${id}`,
        method: 'DELETE',
        secure: true,
        ...params,
      }),

    /**
     * @description Used to update a single existing link.
     *
     * @tags links
     * @name UpdateTransactionLink
     * @summary Update an existing link between transactions.
     * @request PUT:/v1/transaction-links/{id}
     * @secure
     */
    updateTransactionLink: (
      id: string,
      data: TransactionLinkUpdate,
      params: RequestParams = {},
    ) =>
      this.request<
        TransactionLinkSingle,
        | BadRequestResponse
        | UnauthenticatedResponse
        | NotFoundResponse
        | ValidationErrorResponse
        | InternalExceptionResponse
      >({
        path: `/v1/transaction-links/${id}`,
        method: 'PUT',
        body: data,
        secure: true,
        type: ContentType.Json,
        format: 'json',
        ...params,
      }),

    /**
     * @description This endpoint returns a list of all the piggy banks connected to the object group.
     *
     * @tags object_groups
     * @name ListPiggyBankByObjectGroup
     * @summary List all piggy banks related to the object group.
     * @request GET:/v1/object-groups/{id}/piggy-banks
     * @secure
     */
    listPiggyBankByObjectGroup: (
      id: string,
      query?: {
        /**
         * Number of items per page. The default pagination is per 50 items.
         * @format int32
         * @example 10
         */
        limit?: number;
        /**
         * Page number. The default pagination is per 50 items.
         * @format int32
         * @example 1
         */
        page?: number;
      },
      params: RequestParams = {},
    ) =>
      this.request<
        PiggyBankArray,
        | BadRequestResponse
        | UnauthenticatedResponse
        | NotFoundResponse
        | InternalExceptionResponse
      >({
        path: `/v1/object-groups/${id}/piggy-banks`,
        method: 'GET',
        query: query,
        secure: true,
        format: 'json',
        ...params,
      }),

    /**
     * @description List all bills with this object group.
     *
     * @tags object_groups
     * @name ListBillByObjectGroup
     * @summary List all bills with this object group.
     * @request GET:/v1/object-groups/{id}/bills
     * @secure
     */
    listBillByObjectGroup: (
      id: string,
      query?: {
        /**
         * Number of items per page. The default pagination is per 50 items.
         * @format int32
         * @example 10
         */
        limit?: number;
        /**
         * Page number. The default pagination is per 50 items.
         * @format int32
         * @example 1
         */
        page?: number;
      },
      params: RequestParams = {},
    ) =>
      this.request<
        BillArray,
        | BadRequestResponse
        | UnauthenticatedResponse
        | NotFoundResponse
        | InternalExceptionResponse
      >({
        path: `/v1/object-groups/${id}/bills`,
        method: 'GET',
        query: query,
        secure: true,
        format: 'json',
        ...params,
      }),

    /**
     * @description List all oject groups.
     *
     * @tags object_groups
     * @name ListObjectGroups
     * @summary List all oject groups.
     * @request GET:/v1/object-groups
     * @secure
     */
    listObjectGroups: (
      query?: {
        /**
         * Number of items per page. The default pagination is per 50 items.
         * @format int32
         * @example 10
         */
        limit?: number;
        /**
         * Page number. The default pagination is per 50 items.
         * @format int32
         * @example 1
         */
        page?: number;
      },
      params: RequestParams = {},
    ) =>
      this.request<
        ObjectGroupArray,
        | BadRequestResponse
        | UnauthenticatedResponse
        | NotFoundResponse
        | InternalExceptionResponse
      >({
        path: `/v1/object-groups`,
        method: 'GET',
        query: query,
        secure: true,
        format: 'json',
        ...params,
      }),

    /**
     * @description Get a single object group.
     *
     * @tags object_groups
     * @name GetObjectGroup
     * @summary Get a single object group.
     * @request GET:/v1/object-groups/{id}
     * @secure
     */
    getObjectGroup: (id: string, params: RequestParams = {}) =>
      this.request<
        ObjectGroupSingle,
        | BadRequestResponse
        | UnauthenticatedResponse
        | NotFoundResponse
        | InternalExceptionResponse
      >({
        path: `/v1/object-groups/${id}`,
        method: 'GET',
        secure: true,
        format: 'json',
        ...params,
      }),

    /**
     * @description Update existing object group.
     *
     * @tags object_groups
     * @name UpdateObjectGroup
     * @summary Update existing object group.
     * @request PUT:/v1/object-groups/{id}
     * @secure
     */
    updateObjectGroup: (
      id: string,
      data: ObjectGroupUpdate,
      params: RequestParams = {},
    ) =>
      this.request<
        ObjectGroupSingle,
        | BadRequestResponse
        | UnauthenticatedResponse
        | NotFoundResponse
        | ValidationErrorResponse
        | InternalExceptionResponse
      >({
        path: `/v1/object-groups/${id}`,
        method: 'PUT',
        body: data,
        secure: true,
        type: ContentType.Json,
        format: 'json',
        ...params,
      }),

    /**
     * @description Delete a object group.
     *
     * @tags object_groups
     * @name DeleteObjectGroup
     * @summary Delete a object group.
     * @request DELETE:/v1/object-groups/{id}
     * @secure
     */
    deleteObjectGroup: (id: string, params: RequestParams = {}) =>
      this.request<
        void,
        | BadRequestResponse
        | UnauthenticatedResponse
        | NotFoundResponse
        | InternalExceptionResponse
      >({
        path: `/v1/object-groups/${id}`,
        method: 'DELETE',
        secure: true,
        ...params,
      }),

    /**
     * @description List all events linked to a piggy bank (adding and removing money).
     *
     * @tags piggy_banks
     * @name ListEventByPiggyBank
     * @summary List all events linked to a piggy bank.
     * @request GET:/v1/piggy-banks/{id}/events
     * @secure
     */
    listEventByPiggyBank: (
      id: string,
      query?: {
        /**
         * Number of items per page. The default pagination is per 50 items.
         * @format int32
         * @example 10
         */
        limit?: number;
        /**
         * Page number. The default pagination is per 50 items.
         * @format int32
         * @example 1
         */
        page?: number;
      },
      params: RequestParams = {},
    ) =>
      this.request<
        PiggyBankEventArray,
        | BadRequestResponse
        | UnauthenticatedResponse
        | NotFoundResponse
        | InternalExceptionResponse
      >({
        path: `/v1/piggy-banks/${id}/events`,
        method: 'GET',
        query: query,
        secure: true,
        format: 'json',
        ...params,
      }),

    /**
     * @description Lists all attachments.
     *
     * @tags piggy_banks
     * @name ListAttachmentByPiggyBank
     * @summary Lists all attachments.
     * @request GET:/v1/piggy-banks/{id}/attachments
     * @secure
     */
    listAttachmentByPiggyBank: (
      id: string,
      query?: {
        /**
         * Number of items per page. The default pagination is per 50 items.
         * @format int32
         * @example 10
         */
        limit?: number;
        /**
         * Page number. The default pagination is per 50 items.
         * @format int32
         * @example 1
         */
        page?: number;
      },
      params: RequestParams = {},
    ) =>
      this.request<
        AttachmentArray,
        | BadRequestResponse
        | UnauthenticatedResponse
        | NotFoundResponse
        | InternalExceptionResponse
      >({
        path: `/v1/piggy-banks/${id}/attachments`,
        method: 'GET',
        query: query,
        secure: true,
        format: 'json',
        ...params,
      }),

    /**
     * @description List all piggy banks.
     *
     * @tags piggy_banks
     * @name ListPiggyBank
     * @summary List all piggy banks.
     * @request GET:/v1/piggy-banks
     * @secure
     */
    listPiggyBank: (
      query?: {
        /**
         * Number of items per page. The default pagination is per 50 items.
         * @format int32
         * @example 10
         */
        limit?: number;
        /**
         * Page number. The default pagination is per 50 items.
         * @format int32
         * @example 1
         */
        page?: number;
      },
      params: RequestParams = {},
    ) =>
      this.request<
        PiggyBankArray,
        | BadRequestResponse
        | UnauthenticatedResponse
        | NotFoundResponse
        | InternalExceptionResponse
      >({
        path: `/v1/piggy-banks`,
        method: 'GET',
        query: query,
        secure: true,
        format: 'json',
        ...params,
      }),

    /**
     * @description Creates a new piggy bank. The data required can be submitted as a JSON body or as a list of parameters.
     *
     * @tags piggy_banks
     * @name StorePiggyBank
     * @summary Store a new piggy bank
     * @request POST:/v1/piggy-banks
     * @secure
     */
    storePiggyBank: (data: PiggyBankStore, params: RequestParams = {}) =>
      this.request<
        PiggyBankSingle,
        | BadRequestResponse
        | UnauthenticatedResponse
        | NotFoundResponse
        | ValidationErrorResponse
        | InternalExceptionResponse
      >({
        path: `/v1/piggy-banks`,
        method: 'POST',
        body: data,
        secure: true,
        type: ContentType.Json,
        format: 'json',
        ...params,
      }),

    /**
     * @description Get a single piggy bank.
     *
     * @tags piggy_banks
     * @name GetPiggyBank
     * @summary Get a single piggy bank.
     * @request GET:/v1/piggy-banks/{id}
     * @secure
     */
    getPiggyBank: (id: string, params: RequestParams = {}) =>
      this.request<
        PiggyBankSingle,
        | BadRequestResponse
        | UnauthenticatedResponse
        | NotFoundResponse
        | InternalExceptionResponse
      >({
        path: `/v1/piggy-banks/${id}`,
        method: 'GET',
        secure: true,
        format: 'json',
        ...params,
      }),

    /**
     * @description Update existing piggy bank.
     *
     * @tags piggy_banks
     * @name UpdatePiggyBank
     * @summary Update existing piggy bank.
     * @request PUT:/v1/piggy-banks/{id}
     * @secure
     */
    updatePiggyBank: (
      id: string,
      data: PiggyBankUpdate,
      params: RequestParams = {},
    ) =>
      this.request<
        PiggyBankSingle,
        | BadRequestResponse
        | UnauthenticatedResponse
        | NotFoundResponse
        | ValidationErrorResponse
        | InternalExceptionResponse
      >({
        path: `/v1/piggy-banks/${id}`,
        method: 'PUT',
        body: data,
        secure: true,
        type: ContentType.Json,
        format: 'json',
        ...params,
      }),

    /**
     * @description Delete a piggy bank.
     *
     * @tags piggy_banks
     * @name DeletePiggyBank
     * @summary Delete a piggy bank.
     * @request DELETE:/v1/piggy-banks/{id}
     * @secure
     */
    deletePiggyBank: (id: string, params: RequestParams = {}) =>
      this.request<
        void,
        | BadRequestResponse
        | UnauthenticatedResponse
        | NotFoundResponse
        | InternalExceptionResponse
      >({
        path: `/v1/piggy-banks/${id}`,
        method: 'DELETE',
        secure: true,
        ...params,
      }),

    /**
     * @description List all transactions created by a recurring transaction, optionally limited to the date ranges specified.
     *
     * @tags recurrences
     * @name ListTransactionByRecurrence
     * @summary List all transactions created by a recurring transaction.
     * @request GET:/v1/recurrences/{id}/transactions
     * @secure
     */
    listTransactionByRecurrence: (
      id: string,
      query?: {
        /**
         * Number of items per page. The default pagination is per 50 items.
         * @format int32
         * @example 10
         */
        limit?: number;
        /**
         * Page number. The default pagination is per 50 items.
         * @format int32
         * @example 1
         */
        page?: number;
        /**
         * A date formatted YYYY-MM-DD. Both the start and end date must be present.
         * @format date
         * @example "2018-09-17"
         */
        start?: string;
        /**
         * A date formatted YYYY-MM-DD. Both the start and end date must be present.
         * @format date
         * @example "2018-09-17"
         */
        end?: string;
        /** Optional filter on the transaction type(s) returned */
        type?: TransactionTypeFilter;
      },
      params: RequestParams = {},
    ) =>
      this.request<
        TransactionArray,
        | BadRequestResponse
        | UnauthenticatedResponse
        | NotFoundResponse
        | InternalExceptionResponse
      >({
        path: `/v1/recurrences/${id}/transactions`,
        method: 'GET',
        query: query,
        secure: true,
        format: 'json',
        ...params,
      }),

    /**
     * @description List all recurring transactions.
     *
     * @tags recurrences
     * @name ListRecurrence
     * @summary List all recurring transactions.
     * @request GET:/v1/recurrences
     * @secure
     */
    listRecurrence: (
      query?: {
        /**
         * Number of items per page. The default pagination is per 50 items.
         * @format int32
         * @example 10
         */
        limit?: number;
        /**
         * Page number. The default pagination is per 50 items.
         * @format int32
         * @example 1
         */
        page?: number;
      },
      params: RequestParams = {},
    ) =>
      this.request<
        RecurrenceArray,
        | BadRequestResponse
        | UnauthenticatedResponse
        | NotFoundResponse
        | InternalExceptionResponse
      >({
        path: `/v1/recurrences`,
        method: 'GET',
        query: query,
        secure: true,
        format: 'json',
        ...params,
      }),

    /**
     * @description Creates a new recurring transaction. The data required can be submitted as a JSON body or as a list of parameters.
     *
     * @tags recurrences
     * @name StoreRecurrence
     * @summary Store a new recurring transaction
     * @request POST:/v1/recurrences
     * @secure
     */
    storeRecurrence: (data: RecurrenceStore, params: RequestParams = {}) =>
      this.request<
        RecurrenceSingle,
        | BadRequestResponse
        | UnauthenticatedResponse
        | NotFoundResponse
        | ValidationErrorResponse
        | InternalExceptionResponse
      >({
        path: `/v1/recurrences`,
        method: 'POST',
        body: data,
        secure: true,
        type: ContentType.Json,
        format: 'json',
        ...params,
      }),

    /**
     * @description Get a single recurring transaction.
     *
     * @tags recurrences
     * @name GetRecurrence
     * @summary Get a single recurring transaction.
     * @request GET:/v1/recurrences/{id}
     * @secure
     */
    getRecurrence: (id: string, params: RequestParams = {}) =>
      this.request<
        RecurrenceSingle,
        | BadRequestResponse
        | UnauthenticatedResponse
        | NotFoundResponse
        | InternalExceptionResponse
      >({
        path: `/v1/recurrences/${id}`,
        method: 'GET',
        secure: true,
        format: 'json',
        ...params,
      }),

    /**
     * @description Update existing recurring transaction.
     *
     * @tags recurrences
     * @name UpdateRecurrence
     * @summary Update existing recurring transaction.
     * @request PUT:/v1/recurrences/{id}
     * @secure
     */
    updateRecurrence: (
      id: string,
      data: RecurrenceUpdate,
      params: RequestParams = {},
    ) =>
      this.request<
        RecurrenceSingle,
        | BadRequestResponse
        | UnauthenticatedResponse
        | NotFoundResponse
        | ValidationErrorResponse
        | InternalExceptionResponse
      >({
        path: `/v1/recurrences/${id}`,
        method: 'PUT',
        body: data,
        secure: true,
        type: ContentType.Json,
        format: 'json',
        ...params,
      }),

    /**
     * @description Delete a recurring transaction. Transactions created by the recurring transaction will not be deleted.
     *
     * @tags recurrences
     * @name DeleteRecurrence
     * @summary Delete a recurring transaction.
     * @request DELETE:/v1/recurrences/{id}
     * @secure
     */
    deleteRecurrence: (id: string, params: RequestParams = {}) =>
      this.request<
        void,
        | BadRequestResponse
        | UnauthenticatedResponse
        | NotFoundResponse
        | InternalExceptionResponse
      >({
        path: `/v1/recurrences/${id}`,
        method: 'DELETE',
        secure: true,
        ...params,
      }),

    /**
     * @description List rules in this rule group.
     *
     * @tags rule_groups
     * @name ListRuleByGroup
     * @summary List rules in this rule group.
     * @request GET:/v1/rule-groups/{id}/rules
     * @secure
     */
    listRuleByGroup: (
      id: string,
      query?: {
        /**
         * Number of items per page. The default pagination is per 50 items.
         * @format int32
         * @example 10
         */
        limit?: number;
        /**
         * Page number. The default pagination is per 50 items.
         * @format int32
         * @example 1
         */
        page?: number;
      },
      params: RequestParams = {},
    ) =>
      this.request<
        RuleArray,
        | BadRequestResponse
        | UnauthenticatedResponse
        | NotFoundResponse
        | InternalExceptionResponse
      >({
        path: `/v1/rule-groups/${id}/rules`,
        method: 'GET',
        query: query,
        secure: true,
        format: 'json',
        ...params,
      }),

    /**
     * @description Test which transactions would be hit by the rule group. No changes will be made. Limit the result if you want to.
     *
     * @tags rule_groups
     * @name TestRuleGroup
     * @summary Test which transactions would be hit by the rule group. No changes will be made.
     * @request GET:/v1/rule-groups/{id}/test
     * @secure
     */
    testRuleGroup: (
      id: string,
      query?: {
        /**
         * Number of items per page. The default pagination is per 50 items.
         * @format int32
         * @example 10
         */
        limit?: number;
        /**
         * Page number. The default pagination is per 50 items.
         * @format int32
         * @example 1
         */
        page?: number;
        /**
         * A date formatted YYYY-MM-DD, to limit the transactions the test will be applied to. Both the start date and the end date must be present.
         * @format date
         * @example "2018-09-17"
         */
        start?: string;
        /**
         * A date formatted YYYY-MM-DD, to limit the transactions the test will be applied to. Both the start date and the end date must be present.
         * @format date
         * @example "2018-09-17"
         */
        end?: string;
        /** Maximum number of transactions Firefly III will try. Don't set this too high, or it will take Firefly III very long to run the test. I suggest a max of 200. */
        search_limit?: number;
        /** Maximum number of transactions the rule group can actually trigger on, before Firefly III stops. I would suggest setting this to 10 or 15. Don't go above the user's page size, because browsing to page 2 or 3 of a test result would fire the test again, making any navigation efforts very slow. */
        triggered_limit?: number;
        /**
         * Limit the testing of the rule group to these asset accounts or liabilities. Only asset accounts and liabilities will be accepted. Other types will be silently dropped.
         * @example [1,2,3]
         */
        'accounts[]'?: number[];
      },
      params: RequestParams = {},
    ) =>
      this.request<
        TransactionArray,
        | BadRequestResponse
        | UnauthenticatedResponse
        | NotFoundResponse
        | InternalExceptionResponse
      >({
        path: `/v1/rule-groups/${id}/test`,
        method: 'GET',
        query: query,
        secure: true,
        format: 'json',
        ...params,
      }),

    /**
     * @description Fire the rule group on your transactions. Changes will be made by the rules in the rule group! Limit the result if you want to.
     *
     * @tags rule_groups
     * @name FireRuleGroup
     * @summary Fire the rule group on your transactions.
     * @request POST:/v1/rule-groups/{id}/trigger
     * @secure
     */
    fireRuleGroup: (
      id: string,
      query?: {
        /**
         * A date formatted YYYY-MM-DD, to limit the transactions the actions will be applied to. Both the start date and the end date must be present.
         * @format date
         * @example "2018-09-17"
         */
        start?: string;
        /**
         * A date formatted YYYY-MM-DD, to limit the transactions the actions will be applied to. Both the start date and the end date must be present.
         * @format date
         * @example "2018-09-17"
         */
        end?: string;
        /**
         * Limit the triggering of the rule group to these asset accounts or liabilities. Only asset accounts and liabilities will be accepted. Other types will be silently dropped.
         * @example [1,2,3]
         */
        'accounts[]'?: number[];
      },
      params: RequestParams = {},
    ) =>
      this.request<
        void,
        | BadRequestResponse
        | UnauthenticatedResponse
        | NotFoundResponse
        | InternalExceptionResponse
      >({
        path: `/v1/rule-groups/${id}/trigger`,
        method: 'POST',
        query: query,
        secure: true,
        ...params,
      }),

    /**
     * @description List all rule groups.
     *
     * @tags rule_groups
     * @name ListRuleGroup
     * @summary List all rule groups.
     * @request GET:/v1/rule-groups
     * @secure
     */
    listRuleGroup: (
      query?: {
        /**
         * Number of items per page. The default pagination is per 50 items.
         * @format int32
         * @example 10
         */
        limit?: number;
        /**
         * Page number. The default pagination is per 50 items.
         * @format int32
         * @example 1
         */
        page?: number;
      },
      params: RequestParams = {},
    ) =>
      this.request<
        RuleGroupArray,
        | BadRequestResponse
        | UnauthenticatedResponse
        | NotFoundResponse
        | InternalExceptionResponse
      >({
        path: `/v1/rule-groups`,
        method: 'GET',
        query: query,
        secure: true,
        format: 'json',
        ...params,
      }),

    /**
     * @description Creates a new rule group. The data required can be submitted as a JSON body or as a list of parameters.
     *
     * @tags rule_groups
     * @name StoreRuleGroup
     * @summary Store a new rule group.
     * @request POST:/v1/rule-groups
     * @secure
     */
    storeRuleGroup: (data: RuleGroupStore, params: RequestParams = {}) =>
      this.request<
        RuleGroupSingle,
        | BadRequestResponse
        | UnauthenticatedResponse
        | NotFoundResponse
        | ValidationErrorResponse
        | InternalExceptionResponse
      >({
        path: `/v1/rule-groups`,
        method: 'POST',
        body: data,
        secure: true,
        type: ContentType.Json,
        format: 'json',
        ...params,
      }),

    /**
     * @description Get a single rule group. This does not include the rules. For that, see below.
     *
     * @tags rule_groups
     * @name GetRuleGroup
     * @summary Get a single rule group.
     * @request GET:/v1/rule-groups/{id}
     * @secure
     */
    getRuleGroup: (id: string, params: RequestParams = {}) =>
      this.request<
        RuleGroupSingle,
        | BadRequestResponse
        | UnauthenticatedResponse
        | NotFoundResponse
        | InternalExceptionResponse
      >({
        path: `/v1/rule-groups/${id}`,
        method: 'GET',
        secure: true,
        format: 'json',
        ...params,
      }),

    /**
     * @description Update existing rule group.
     *
     * @tags rule_groups
     * @name UpdateRuleGroup
     * @summary Update existing rule group.
     * @request PUT:/v1/rule-groups/{id}
     * @secure
     */
    updateRuleGroup: (
      id: string,
      data: RuleGroupUpdate,
      params: RequestParams = {},
    ) =>
      this.request<
        RuleGroupSingle,
        | BadRequestResponse
        | UnauthenticatedResponse
        | NotFoundResponse
        | ValidationErrorResponse
        | InternalExceptionResponse
      >({
        path: `/v1/rule-groups/${id}`,
        method: 'PUT',
        body: data,
        secure: true,
        type: ContentType.Json,
        format: 'json',
        ...params,
      }),

    /**
     * @description Delete a rule group.
     *
     * @tags rule_groups
     * @name DeleteRuleGroup
     * @summary Delete a rule group.
     * @request DELETE:/v1/rule-groups/{id}
     * @secure
     */
    deleteRuleGroup: (id: string, params: RequestParams = {}) =>
      this.request<
        void,
        | BadRequestResponse
        | UnauthenticatedResponse
        | NotFoundResponse
        | InternalExceptionResponse
      >({
        path: `/v1/rule-groups/${id}`,
        method: 'DELETE',
        secure: true,
        ...params,
      }),

    /**
     * @description Test which transactions would be hit by the rule. No changes will be made. Limit the result if you want to.
     *
     * @tags rules
     * @name TestRule
     * @summary Test which transactions would be hit by the rule. No changes will be made.
     * @request GET:/v1/rules/{id}/test
     * @secure
     */
    testRule: (
      id: string,
      query?: {
        /**
         * A date formatted YYYY-MM-DD, to limit the transactions the test will be applied to. Both the start date and the end date must be present.
         * @format date
         * @example "2018-09-17"
         */
        start?: string;
        /**
         * A date formatted YYYY-MM-DD, to limit the transactions the test will be applied to. Both the start date and the end date must be present.
         * @format date
         * @example "2018-09-17"
         */
        end?: string;
        /**
         * Limit the testing of the rule to these asset accounts or liabilities. Only asset accounts and liabilities will be accepted. Other types will be silently dropped.
         * @example [1,2,3]
         */
        'accounts[]'?: number[];
      },
      params: RequestParams = {},
    ) =>
      this.request<
        TransactionArray,
        | BadRequestResponse
        | UnauthenticatedResponse
        | NotFoundResponse
        | InternalExceptionResponse
      >({
        path: `/v1/rules/${id}/test`,
        method: 'GET',
        query: query,
        secure: true,
        format: 'json',
        ...params,
      }),

    /**
     * @description Fire the rule group on your transactions. Changes will be made by the rules in the group! Limit the result if you want to.
     *
     * @tags rules
     * @name FireRule
     * @summary Fire the rule on your transactions.
     * @request POST:/v1/rules/{id}/trigger
     * @secure
     */
    fireRule: (
      id: string,
      query?: {
        /**
         * A date formatted YYYY-MM-DD, to limit the transactions the actions will be applied to. If the start date is not present, it will be set to one year ago. If you use this field, both the start date and the end date must be present.
         * @format date
         * @example "2018-09-17"
         */
        start?: string;
        /**
         * A date formatted YYYY-MM-DD, to limit the transactions the actions will be applied to. If the end date is not present, it will be set to today. If you use this field, both the start date and the end date must be present.
         * @format date
         * @example "2018-09-17"
         */
        end?: string;
        /**
         * Limit the triggering of the rule to these asset accounts or liabilities. Only asset accounts and liabilities will be accepted. Other types will be silently dropped.
         * @example [1,2,3]
         */
        'accounts[]'?: number[];
      },
      params: RequestParams = {},
    ) =>
      this.request<
        void,
        | BadRequestResponse
        | UnauthenticatedResponse
        | NotFoundResponse
        | InternalExceptionResponse
      >({
        path: `/v1/rules/${id}/trigger`,
        method: 'POST',
        query: query,
        secure: true,
        ...params,
      }),

    /**
     * @description List all rules.
     *
     * @tags rules
     * @name ListRule
     * @summary List all rules.
     * @request GET:/v1/rules
     * @secure
     */
    listRule: (
      query?: {
        /**
         * Number of items per page. The default pagination is per 50 items.
         * @format int32
         * @example 10
         */
        limit?: number;
        /**
         * Page number. The default pagination is per 50 items.
         * @format int32
         * @example 1
         */
        page?: number;
      },
      params: RequestParams = {},
    ) =>
      this.request<
        RuleArray,
        | BadRequestResponse
        | UnauthenticatedResponse
        | NotFoundResponse
        | InternalExceptionResponse
      >({
        path: `/v1/rules`,
        method: 'GET',
        query: query,
        secure: true,
        format: 'json',
        ...params,
      }),

    /**
     * @description Creates a new rule. The data required can be submitted as a JSON body or as a list of parameters.
     *
     * @tags rules
     * @name StoreRule
     * @summary Store a new rule
     * @request POST:/v1/rules
     * @secure
     */
    storeRule: (data: RuleStore, params: RequestParams = {}) =>
      this.request<
        RuleSingle,
        | BadRequestResponse
        | UnauthenticatedResponse
        | NotFoundResponse
        | ValidationErrorResponse
        | InternalExceptionResponse
      >({
        path: `/v1/rules`,
        method: 'POST',
        body: data,
        secure: true,
        type: ContentType.Json,
        format: 'json',
        ...params,
      }),

    /**
     * @description Get a single rule.
     *
     * @tags rules
     * @name GetRule
     * @summary Get a single rule.
     * @request GET:/v1/rules/{id}
     * @secure
     */
    getRule: (id: string, params: RequestParams = {}) =>
      this.request<
        RuleSingle,
        | BadRequestResponse
        | UnauthenticatedResponse
        | NotFoundResponse
        | InternalExceptionResponse
      >({
        path: `/v1/rules/${id}`,
        method: 'GET',
        secure: true,
        format: 'json',
        ...params,
      }),

    /**
     * @description Update existing rule.
     *
     * @tags rules
     * @name UpdateRule
     * @summary Update existing rule.
     * @request PUT:/v1/rules/{id}
     * @secure
     */
    updateRule: (id: string, data: RuleUpdate, params: RequestParams = {}) =>
      this.request<
        RuleSingle,
        | BadRequestResponse
        | UnauthenticatedResponse
        | NotFoundResponse
        | ValidationErrorResponse
        | InternalExceptionResponse
      >({
        path: `/v1/rules/${id}`,
        method: 'PUT',
        body: data,
        secure: true,
        type: ContentType.Json,
        format: 'json',
        ...params,
      }),

    /**
     * @description Delete an rule.
     *
     * @tags rules
     * @name DeleteRule
     * @summary Delete an rule.
     * @request DELETE:/v1/rules/{id}
     * @secure
     */
    deleteRule: (id: string, params: RequestParams = {}) =>
      this.request<
        void,
        | BadRequestResponse
        | UnauthenticatedResponse
        | NotFoundResponse
        | InternalExceptionResponse
      >({
        path: `/v1/rules/${id}`,
        method: 'DELETE',
        secure: true,
        ...params,
      }),

    /**
     * @description Lists all attachments.
     *
     * @tags tags
     * @name ListAttachmentByTag
     * @summary Lists all attachments.
     * @request GET:/v1/tags/{tag}/attachments
     * @secure
     */
    listAttachmentByTag: (
      tag: string,
      query?: {
        /**
         * Number of items per page. The default pagination is per 50 items.
         * @format int32
         * @example 10
         */
        limit?: number;
        /**
         * Page number. The default pagination is per 50 items.
         * @format int32
         * @example 1
         */
        page?: number;
      },
      params: RequestParams = {},
    ) =>
      this.request<
        AttachmentArray,
        | BadRequestResponse
        | UnauthenticatedResponse
        | NotFoundResponse
        | InternalExceptionResponse
      >({
        path: `/v1/tags/${tag}/attachments`,
        method: 'GET',
        query: query,
        secure: true,
        format: 'json',
        ...params,
      }),

    /**
     * @description List all transactions with this tag.
     *
     * @tags tags
     * @name ListTransactionByTag
     * @summary List all transactions with this tag.
     * @request GET:/v1/tags/{tag}/transactions
     * @secure
     */
    listTransactionByTag: (
      tag: string,
      query?: {
        /**
         * Number of items per page. The default pagination is per 50 items.
         * @format int32
         * @example 10
         */
        limit?: number;
        /**
         * Page number. The default pagination is per 50 items.
         * @format int32
         * @example 1
         */
        page?: number;
        /**
         * A date formatted YYYY-MM-DD. This is the start date of the selected range (inclusive).
         * @format date
         * @example "2018-09-17"
         */
        start?: string;
        /**
         * A date formatted YYYY-MM-DD. This is the end date of the selected range (inclusive).
         * @format date
         * @example "2018-09-17"
         */
        end?: string;
        /** Optional filter on the transaction type(s) returned. */
        type?: TransactionTypeFilter;
      },
      params: RequestParams = {},
    ) =>
      this.request<
        TransactionArray,
        | BadRequestResponse
        | UnauthenticatedResponse
        | NotFoundResponse
        | InternalExceptionResponse
      >({
        path: `/v1/tags/${tag}/transactions`,
        method: 'GET',
        query: query,
        secure: true,
        format: 'json',
        ...params,
      }),

    /**
     * @description List all of the user's tags.
     *
     * @tags tags
     * @name ListTag
     * @summary List all tags.
     * @request GET:/v1/tags
     * @secure
     */
    listTag: (
      query?: {
        /**
         * Number of items per page. The default pagination is per 50 items.
         * @format int32
         * @example 10
         */
        limit?: number;
        /**
         * Page number. The default pagination is per 50 items.
         * @format int32
         * @example 1
         */
        page?: number;
      },
      params: RequestParams = {},
    ) =>
      this.request<
        TagArray,
        | BadRequestResponse
        | UnauthenticatedResponse
        | NotFoundResponse
        | InternalExceptionResponse
      >({
        path: `/v1/tags`,
        method: 'GET',
        query: query,
        secure: true,
        format: 'json',
        ...params,
      }),

    /**
     * @description Creates a new tag. The data required can be submitted as a JSON body or as a list of parameters.
     *
     * @tags tags
     * @name StoreTag
     * @summary Store a new tag
     * @request POST:/v1/tags
     * @secure
     */
    storeTag: (data: TagModelStore, params: RequestParams = {}) =>
      this.request<
        TagSingle,
        | BadRequestResponse
        | UnauthenticatedResponse
        | NotFoundResponse
        | ValidationErrorResponse
        | InternalExceptionResponse
      >({
        path: `/v1/tags`,
        method: 'POST',
        body: data,
        secure: true,
        type: ContentType.Json,
        format: 'json',
        ...params,
      }),

    /**
     * @description Get a single tag.
     *
     * @tags tags
     * @name GetTag
     * @summary Get a single tag.
     * @request GET:/v1/tags/{tag}
     * @secure
     */
    getTag: (
      tag: string,
      query?: {
        /**
         * Number of items per page. The default pagination is per 50 items.
         * @format int32
         * @example 10
         */
        limit?: number;
        /**
         * Page number. The default pagination is per 50 items.
         * @format int32
         * @example 1
         */
        page?: number;
      },
      params: RequestParams = {},
    ) =>
      this.request<
        TagSingle,
        | BadRequestResponse
        | UnauthenticatedResponse
        | NotFoundResponse
        | InternalExceptionResponse
      >({
        path: `/v1/tags/${tag}`,
        method: 'GET',
        query: query,
        secure: true,
        format: 'json',
        ...params,
      }),

    /**
     * @description Update existing tag.
     *
     * @tags tags
     * @name UpdateTag
     * @summary Update existing tag.
     * @request PUT:/v1/tags/{tag}
     * @secure
     */
    updateTag: (
      tag: string,
      data: TagModelUpdate,
      params: RequestParams = {},
    ) =>
      this.request<
        TagSingle,
        | BadRequestResponse
        | UnauthenticatedResponse
        | NotFoundResponse
        | ValidationErrorResponse
        | InternalExceptionResponse
      >({
        path: `/v1/tags/${tag}`,
        method: 'PUT',
        body: data,
        secure: true,
        type: ContentType.Json,
        format: 'json',
        ...params,
      }),

    /**
     * @description Delete an tag.
     *
     * @tags tags
     * @name DeleteTag
     * @summary Delete an tag.
     * @request DELETE:/v1/tags/{tag}
     * @secure
     */
    deleteTag: (tag: string, params: RequestParams = {}) =>
      this.request<
        void,
        | BadRequestResponse
        | UnauthenticatedResponse
        | NotFoundResponse
        | InternalExceptionResponse
      >({
        path: `/v1/tags/${tag}`,
        method: 'DELETE',
        secure: true,
        ...params,
      }),

    /**
     * @description List all accounts with this currency.
     *
     * @tags currencies
     * @name ListAccountByCurrency
     * @summary List all accounts with this currency.
     * @request GET:/v1/currencies/{code}/accounts
     * @secure
     */
    listAccountByCurrency: (
      code: string,
      query?: {
        /**
         * Number of items per page. The default pagination is per 50 items.
         * @format int32
         * @example 10
         */
        limit?: number;
        /**
         * Page number. The default pagination is per 50 items.
         * @format int32
         * @example 1
         */
        page?: number;
        /**
         * A date formatted YYYY-MM-DD. When added to the request, Firefly III will show the account's balance on that day.
         * @format date
         */
        date?: string;
        /** Optional filter on the account type(s) returned */
        type?: AccountTypeFilter;
      },
      params: RequestParams = {},
    ) =>
      this.request<
        AccountArray,
        | BadRequestResponse
        | UnauthenticatedResponse
        | NotFoundResponse
        | InternalExceptionResponse
      >({
        path: `/v1/currencies/${code}/accounts`,
        method: 'GET',
        query: query,
        secure: true,
        format: 'json',
        ...params,
      }),

    /**
     * @description List all available budgets with this currency.
     *
     * @tags currencies
     * @name ListAvailableBudgetByCurrency
     * @summary List all available budgets with this currency.
     * @request GET:/v1/currencies/{code}/available-budgets
     * @secure
     */
    listAvailableBudgetByCurrency: (
      code: string,
      query?: {
        /**
         * Number of items per page. The default pagination is per 50 items.
         * @format int32
         * @example 10
         */
        limit?: number;
        /**
         * Page number. The default pagination is per 50 items.
         * @format int32
         * @example 1
         */
        page?: number;
      },
      params: RequestParams = {},
    ) =>
      this.request<
        AvailableBudgetArray,
        | BadRequestResponse
        | UnauthenticatedResponse
        | NotFoundResponse
        | InternalExceptionResponse
      >({
        path: `/v1/currencies/${code}/available-budgets`,
        method: 'GET',
        query: query,
        secure: true,
        format: 'json',
        ...params,
      }),

    /**
     * @description List all bills with this currency.
     *
     * @tags currencies
     * @name ListBillByCurrency
     * @summary List all bills with this currency.
     * @request GET:/v1/currencies/{code}/bills
     * @secure
     */
    listBillByCurrency: (
      code: string,
      query?: {
        /**
         * Number of items per page. The default pagination is per 50 items.
         * @format int32
         * @example 10
         */
        limit?: number;
        /**
         * Page number. The default pagination is per 50 items.
         * @format int32
         * @example 1
         */
        page?: number;
      },
      params: RequestParams = {},
    ) =>
      this.request<
        BillArray,
        | BadRequestResponse
        | UnauthenticatedResponse
        | NotFoundResponse
        | InternalExceptionResponse
      >({
        path: `/v1/currencies/${code}/bills`,
        method: 'GET',
        query: query,
        secure: true,
        format: 'json',
        ...params,
      }),

    /**
     * @description List all budget limits with this currency
     *
     * @tags currencies
     * @name ListBudgetLimitByCurrency
     * @summary List all budget limits with this currency
     * @request GET:/v1/currencies/{code}/budget_limits
     * @secure
     */
    listBudgetLimitByCurrency: (
      code: string,
      query?: {
        /**
         * Number of items per page. The default pagination is per 50 items.
         * @format int32
         * @example 10
         */
        limit?: number;
        /**
         * Page number. The default pagination is per 50 items.
         * @format int32
         * @example 1
         */
        page?: number;
        /**
         * Start date for the budget limit list.
         * @format date
         * @example "2018-01-01"
         */
        start?: string;
        /**
         * End date for the budget limit list.
         * @format date
         * @example "2018-01-31"
         */
        end?: string;
      },
      params: RequestParams = {},
    ) =>
      this.request<
        BudgetLimitArray,
        | BadRequestResponse
        | UnauthenticatedResponse
        | NotFoundResponse
        | InternalExceptionResponse
      >({
        path: `/v1/currencies/${code}/budget_limits`,
        method: 'GET',
        query: query,
        secure: true,
        format: 'json',
        ...params,
      }),

    /**
     * @description List all recurring transactions with this currency.
     *
     * @tags currencies
     * @name ListRecurrenceByCurrency
     * @summary List all recurring transactions with this currency.
     * @request GET:/v1/currencies/{code}/recurrences
     * @secure
     */
    listRecurrenceByCurrency: (
      code: string,
      query?: {
        /**
         * Number of items per page. The default pagination is per 50 items.
         * @format int32
         * @example 10
         */
        limit?: number;
        /**
         * Page number. The default pagination is per 50 items.
         * @format int32
         * @example 1
         */
        page?: number;
      },
      params: RequestParams = {},
    ) =>
      this.request<
        RecurrenceArray,
        | BadRequestResponse
        | UnauthenticatedResponse
        | NotFoundResponse
        | InternalExceptionResponse
      >({
        path: `/v1/currencies/${code}/recurrences`,
        method: 'GET',
        query: query,
        secure: true,
        format: 'json',
        ...params,
      }),

    /**
     * @description List all rules with this currency.
     *
     * @tags currencies
     * @name ListRuleByCurrency
     * @summary List all rules with this currency.
     * @request GET:/v1/currencies/{code}/rules
     * @secure
     */
    listRuleByCurrency: (
      code: string,
      query?: {
        /**
         * Number of items per page. The default pagination is per 50 items.
         * @format int32
         * @example 10
         */
        limit?: number;
        /**
         * Page number. The default pagination is per 50 items.
         * @format int32
         * @example 1
         */
        page?: number;
      },
      params: RequestParams = {},
    ) =>
      this.request<
        RuleArray,
        | BadRequestResponse
        | UnauthenticatedResponse
        | NotFoundResponse
        | InternalExceptionResponse
      >({
        path: `/v1/currencies/${code}/rules`,
        method: 'GET',
        query: query,
        secure: true,
        format: 'json',
        ...params,
      }),

    /**
     * @description List all transactions with this currency.
     *
     * @tags currencies
     * @name ListTransactionByCurrency
     * @summary List all transactions with this currency.
     * @request GET:/v1/currencies/{code}/transactions
     * @secure
     */
    listTransactionByCurrency: (
      code: string,
      query?: {
        /**
         * Number of items per page. The default pagination is per 50 items.
         * @format int32
         * @example 10
         */
        limit?: number;
        /**
         * Page number. The default pagination is per 50 items.
         * @format int32
         * @example 1
         */
        page?: number;
        /**
         * A date formatted YYYY-MM-DD, to limit the list of transactions.
         * @format date
         * @example "2018-09-17"
         */
        start?: string;
        /**
         * A date formatted YYYY-MM-DD, to limit the list of transactions.
         * @format date
         * @example "2018-12-31"
         */
        end?: string;
        /** Optional filter on the transaction type(s) returned */
        type?: TransactionTypeFilter;
      },
      params: RequestParams = {},
    ) =>
      this.request<
        TransactionArray,
        | BadRequestResponse
        | UnauthenticatedResponse
        | NotFoundResponse
        | InternalExceptionResponse
      >({
        path: `/v1/currencies/${code}/transactions`,
        method: 'GET',
        query: query,
        secure: true,
        format: 'json',
        ...params,
      }),

    /**
     * @description List all currencies.
     *
     * @tags currencies
     * @name ListCurrency
     * @summary List all currencies.
     * @request GET:/v1/currencies
     * @secure
     */
    listCurrency: (
      query?: {
        /**
         * Number of items per page. The default pagination is per 50 items.
         * @format int32
         * @example 10
         */
        limit?: number;
        /**
         * Page number. The default pagination is per 50 items.
         * @format int32
         * @example 1
         */
        page?: number;
      },
      params: RequestParams = {},
    ) =>
      this.request<
        CurrencyArray,
        | BadRequestResponse
        | UnauthenticatedResponse
        | NotFoundResponse
        | InternalExceptionResponse
      >({
        path: `/v1/currencies`,
        method: 'GET',
        query: query,
        secure: true,
        format: 'json',
        ...params,
      }),

    /**
     * @description Creates a new currency. The data required can be submitted as a JSON body or as a list of parameters.
     *
     * @tags currencies
     * @name StoreCurrency
     * @summary Store a new currency
     * @request POST:/v1/currencies
     * @secure
     */
    storeCurrency: (data: CurrencyStore, params: RequestParams = {}) =>
      this.request<
        CurrencySingle,
        | BadRequestResponse
        | UnauthenticatedResponse
        | NotFoundResponse
        | ValidationErrorResponse
        | InternalExceptionResponse
      >({
        path: `/v1/currencies`,
        method: 'POST',
        body: data,
        secure: true,
        type: ContentType.Json,
        format: 'json',
        ...params,
      }),

    /**
     * @description Enable a single currency.
     *
     * @tags currencies
     * @name EnableCurrency
     * @summary Enable a single currency.
     * @request POST:/v1/currencies/{code}/enable
     * @secure
     */
    enableCurrency: (code: string, params: RequestParams = {}) =>
      this.request<
        CurrencySingle,
        | BadRequestResponse
        | UnauthenticatedResponse
        | NotFoundResponse
        | InternalExceptionResponse
      >({
        path: `/v1/currencies/${code}/enable`,
        method: 'POST',
        secure: true,
        format: 'json',
        ...params,
      }),

    /**
     * @description Disable a currency.
     *
     * @tags currencies
     * @name DisableCurrency
     * @summary Disable a currency.
     * @request POST:/v1/currencies/{code}/disable
     * @secure
     */
    disableCurrency: (code: string, params: RequestParams = {}) =>
      this.request<
        CurrencySingle,
        | BadRequestResponse
        | UnauthenticatedResponse
        | NotFoundResponse
        | void
        | InternalExceptionResponse
      >({
        path: `/v1/currencies/${code}/disable`,
        method: 'POST',
        secure: true,
        format: 'json',
        ...params,
      }),

    /**
     * @description Make this currency the default currency for the user. If the currency is not enabled, it will be enabled as well.
     *
     * @tags currencies
     * @name DefaultCurrency
     * @summary Make currency default currency.
     * @request POST:/v1/currencies/{code}/default
     * @secure
     */
    defaultCurrency: (code: string, params: RequestParams = {}) =>
      this.request<
        CurrencySingle,
        | BadRequestResponse
        | UnauthenticatedResponse
        | NotFoundResponse
        | InternalExceptionResponse
      >({
        path: `/v1/currencies/${code}/default`,
        method: 'POST',
        secure: true,
        format: 'json',
        ...params,
      }),

    /**
     * @description Get a single currency.
     *
     * @tags currencies
     * @name GetCurrency
     * @summary Get a single currency.
     * @request GET:/v1/currencies/{code}
     * @secure
     */
    getCurrency: (code: string, params: RequestParams = {}) =>
      this.request<
        CurrencySingle,
        | BadRequestResponse
        | UnauthenticatedResponse
        | NotFoundResponse
        | InternalExceptionResponse
      >({
        path: `/v1/currencies/${code}`,
        method: 'GET',
        secure: true,
        format: 'json',
        ...params,
      }),

    /**
     * @description Update existing currency.
     *
     * @tags currencies
     * @name UpdateCurrency
     * @summary Update existing currency.
     * @request PUT:/v1/currencies/{code}
     * @secure
     */
    updateCurrency: (
      code: string,
      data: CurrencyUpdate,
      params: RequestParams = {},
    ) =>
      this.request<
        CurrencySingle,
        | BadRequestResponse
        | UnauthenticatedResponse
        | NotFoundResponse
        | ValidationErrorResponse
        | InternalExceptionResponse
      >({
        path: `/v1/currencies/${code}`,
        method: 'PUT',
        body: data,
        secure: true,
        type: ContentType.Json,
        format: 'json',
        ...params,
      }),

    /**
     * @description Delete a currency.
     *
     * @tags currencies
     * @name DeleteCurrency
     * @summary Delete a currency.
     * @request DELETE:/v1/currencies/{code}
     * @secure
     */
    deleteCurrency: (code: string, params: RequestParams = {}) =>
      this.request<
        void,
        | BadRequestResponse
        | UnauthenticatedResponse
        | NotFoundResponse
        | InternalExceptionResponse
      >({
        path: `/v1/currencies/${code}`,
        method: 'DELETE',
        secure: true,
        ...params,
      }),

    /**
     * @description Get the user's default currency.
     *
     * @tags currencies
     * @name GetDefaultCurrency
     * @summary Get the user's default currency.
     * @request GET:/v1/currencies/default
     * @secure
     */
    getDefaultCurrency: (params: RequestParams = {}) =>
      this.request<
        CurrencySingle,
        | BadRequestResponse
        | UnauthenticatedResponse
        | NotFoundResponse
        | InternalExceptionResponse
      >({
        path: `/v1/currencies/default`,
        method: 'GET',
        secure: true,
        format: 'json',
        ...params,
      }),

    /**
     * @description Lists all the transaction links for an individual journal (a split). Don't use the group ID, you need the actual underlying journal (the split).
     *
     * @tags transactions
     * @name ListLinksByJournal
     * @summary Lists all the transaction links for an individual journal (individual split).
     * @request GET:/v1/transaction-journals/{id}/links
     * @secure
     */
    listLinksByJournal: (
      id: string,
      query?: {
        /**
         * Number of items per page. The default pagination is per 50 items.
         * @format int32
         * @example 10
         */
        limit?: number;
        /**
         * Page number. The default pagination is per 50 items.
         * @format int32
         * @example 1
         */
        page?: number;
      },
      params: RequestParams = {},
    ) =>
      this.request<
        TransactionLinkArray,
        | BadRequestResponse
        | UnauthenticatedResponse
        | NotFoundResponse
        | InternalExceptionResponse
      >({
        path: `/v1/transaction-journals/${id}/links`,
        method: 'GET',
        query: query,
        secure: true,
        format: 'json',
        ...params,
      }),

    /**
     * @description Get a single transaction by underlying journal (split).
     *
     * @tags transactions
     * @name GetTransactionByJournal
     * @summary Get a single transaction, based on one of the underlying transaction journals (transaction splits).
     * @request GET:/v1/transaction-journals/{id}
     * @secure
     */
    getTransactionByJournal: (id: string, params: RequestParams = {}) =>
      this.request<
        TransactionSingle,
        | BadRequestResponse
        | UnauthenticatedResponse
        | NotFoundResponse
        | InternalExceptionResponse
      >({
        path: `/v1/transaction-journals/${id}`,
        method: 'GET',
        secure: true,
        format: 'json',
        ...params,
      }),

    /**
     * @description Delete an individual journal (split) from a transaction.
     *
     * @tags transactions
     * @name DeleteTransactionJournal
     * @summary Delete split from transaction
     * @request DELETE:/v1/transaction-journals/{id}
     * @secure
     */
    deleteTransactionJournal: (id: string, params: RequestParams = {}) =>
      this.request<
        void,
        | BadRequestResponse
        | UnauthenticatedResponse
        | NotFoundResponse
        | InternalExceptionResponse
      >({
        path: `/v1/transaction-journals/${id}`,
        method: 'DELETE',
        secure: true,
        ...params,
      }),

    /**
     * @description Lists all attachments.
     *
     * @tags transactions
     * @name ListAttachmentByTransaction
     * @summary Lists all attachments.
     * @request GET:/v1/transactions/{id}/attachments
     * @secure
     */
    listAttachmentByTransaction: (
      id: string,
      query?: {
        /**
         * Number of items per page. The default pagination is per 50 items.
         * @format int32
         * @example 10
         */
        limit?: number;
        /**
         * Page number. The default pagination is per 50 items.
         * @format int32
         * @example 1
         */
        page?: number;
      },
      params: RequestParams = {},
    ) =>
      this.request<
        AttachmentArray,
        | BadRequestResponse
        | UnauthenticatedResponse
        | NotFoundResponse
        | InternalExceptionResponse
      >({
        path: `/v1/transactions/${id}/attachments`,
        method: 'GET',
        query: query,
        secure: true,
        format: 'json',
        ...params,
      }),

    /**
     * @description Lists all piggy bank events.
     *
     * @tags transactions
     * @name ListEventByTransaction
     * @summary Lists all piggy bank events.
     * @request GET:/v1/transactions/{id}/piggy-bank-events
     * @secure
     */
    listEventByTransaction: (
      id: string,
      query?: {
        /**
         * Number of items per page. The default pagination is per 50 items.
         * @format int32
         * @example 10
         */
        limit?: number;
        /**
         * Page number. The default pagination is per 50 items.
         * @format int32
         * @example 1
         */
        page?: number;
      },
      params: RequestParams = {},
    ) =>
      this.request<
        PiggyBankEventArray,
        | BadRequestResponse
        | UnauthenticatedResponse
        | NotFoundResponse
        | InternalExceptionResponse
      >({
        path: `/v1/transactions/${id}/piggy-bank-events`,
        method: 'GET',
        query: query,
        secure: true,
        format: 'json',
        ...params,
      }),

    /**
     * @description List all the user's transactions.
     *
     * @tags transactions
     * @name ListTransaction
     * @summary List all the user's transactions.
     * @request GET:/v1/transactions
     * @secure
     */
    listTransaction: (
      query?: {
        /**
         * Number of items per page. The default pagination is per 50 items.
         * @format int32
         * @example 10
         */
        limit?: number;
        /**
         * Page number. The default pagination is per 50 items.
         * @format int32
         * @example 1
         */
        page?: number;
        /**
         * A date formatted YYYY-MM-DD. This is the start date of the selected range (inclusive).
         * @format date
         * @example "2018-09-17"
         */
        start?: string;
        /**
         * A date formatted YYYY-MM-DD. This is the end date of the selected range (inclusive).
         * @format date
         * @example "2018-09-17"
         */
        end?: string;
        /** Optional filter on the transaction type(s) returned. */
        type?: TransactionTypeFilter;
      },
      params: RequestParams = {},
    ) =>
      this.request<
        TransactionArray,
        | BadRequestResponse
        | UnauthenticatedResponse
        | NotFoundResponse
        | InternalExceptionResponse
      >({
        path: `/v1/transactions`,
        method: 'GET',
        query: query,
        secure: true,
        format: 'json',
        ...params,
      }),

    /**
     * @description Creates a new transaction. The data required can be submitted as a JSON body or as a list of parameters.
     *
     * @tags transactions
     * @name StoreTransaction
     * @summary Store a new transaction
     * @request POST:/v1/transactions
     * @secure
     */
    storeTransaction: (data: TransactionStore, params: RequestParams = {}) =>
      this.request<
        TransactionSingle,
        | BadRequestResponse
        | UnauthenticatedResponse
        | NotFoundResponse
        | ValidationErrorResponse
        | InternalExceptionResponse
      >({
        path: `/v1/transactions`,
        method: 'POST',
        body: data,
        secure: true,
        type: ContentType.Json,
        format: 'json',
        ...params,
      }),

    /**
     * @description Get a single transaction.
     *
     * @tags transactions
     * @name GetTransaction
     * @summary Get a single transaction.
     * @request GET:/v1/transactions/{id}
     * @secure
     */
    getTransaction: (id: string, params: RequestParams = {}) =>
      this.request<
        TransactionSingle,
        | BadRequestResponse
        | UnauthenticatedResponse
        | NotFoundResponse
        | InternalExceptionResponse
      >({
        path: `/v1/transactions/${id}`,
        method: 'GET',
        secure: true,
        format: 'json',
        ...params,
      }),

    /**
     * @description Update an existing transaction.
     *
     * @tags transactions
     * @name UpdateTransaction
     * @summary Update existing transaction. For more information, see https://docs.firefly-iii.org/references/firefly-iii/api/specials/
     * @request PUT:/v1/transactions/{id}
     * @secure
     */
    updateTransaction: (
      id: string,
      data: TransactionUpdate,
      params: RequestParams = {},
    ) =>
      this.request<
        TransactionSingle,
        | BadRequestResponse
        | UnauthenticatedResponse
        | NotFoundResponse
        | ValidationErrorResponse
        | InternalExceptionResponse
      >({
        path: `/v1/transactions/${id}`,
        method: 'PUT',
        body: data,
        secure: true,
        type: ContentType.Json,
        format: 'json',
        ...params,
      }),

    /**
     * @description Delete a transaction.
     *
     * @tags transactions
     * @name DeleteTransaction
     * @summary Delete a transaction.
     * @request DELETE:/v1/transactions/{id}
     * @secure
     */
    deleteTransaction: (id: string, params: RequestParams = {}) =>
      this.request<
        void,
        | BadRequestResponse
        | UnauthenticatedResponse
        | NotFoundResponse
        | InternalExceptionResponse
      >({
        path: `/v1/transactions/${id}`,
        method: 'DELETE',
        secure: true,
        ...params,
      }),

    /**
     * @description Search for accounts
     *
     * @tags search
     * @name SearchAccounts
     * @summary Search for accounts
     * @request GET:/v1/search/accounts
     * @secure
     */
    searchAccounts: (
      query: {
        /**
         * Number of items per page. The default pagination is per 50 items.
         * @format int32
         * @example 10
         */
        limit?: number;
        /**
         * Page number. The default pagination is per 50 items.
         * @format int32
         * @example 1
         */
        page?: number;
        /**
         * The query you wish to search for.
         * @example "checking"
         */
        query: string;
        /** The type of accounts you wish to limit the search to. */
        type?: AccountTypeFilter;
        /** The account field(s) you want to search in. */
        field: AccountSearchFieldFilter;
      },
      params: RequestParams = {},
    ) =>
      this.request<
        AccountArray,
        | BadRequestResponse
        | UnauthenticatedResponse
        | NotFoundResponse
        | InternalExceptionResponse
      >({
        path: `/v1/search/accounts`,
        method: 'GET',
        query: query,
        secure: true,
        format: 'json',
        ...params,
      }),

    /**
     * @description Searches through the users transactions.
     *
     * @tags search
     * @name SearchTransactions
     * @summary Search for transactions
     * @request GET:/v1/search/transactions
     * @secure
     */
    searchTransactions: (
      query: {
        /**
         * Number of items per page. The default pagination is per 50 items.
         * @format int32
         * @example 10
         */
        limit?: number;
        /**
         * Page number. The default pagination is per 50 items.
         * @format int32
         * @example 1
         */
        page?: number;
        /**
         * The query you wish to search for.
         * @example "groceries"
         */
        query: string;
      },
      params: RequestParams = {},
    ) =>
      this.request<
        TransactionArray,
        | BadRequestResponse
        | UnauthenticatedResponse
        | NotFoundResponse
        | InternalExceptionResponse
      >({
        path: `/v1/search/transactions`,
        method: 'GET',
        query: query,
        secure: true,
        format: 'json',
        ...params,
      }),

    /**
     * @description Returns basic sums of the users data, like the net worth, spent and earned amounts. It is multi-currency, and is used in Firefly III to populate the dashboard.
     *
     * @tags summary
     * @name GetBasicSummary
     * @summary Returns basic sums of the users data.
     * @request GET:/v1/summary/basic
     * @secure
     */
    getBasicSummary: (
      query: {
        /**
         * A date formatted YYYY-MM-DD.
         * @format date
         */
        start: string;
        /**
         * A date formatted YYYY-MM-DD.
         * @format date
         */
        end: string;
        /**
         * A currency code like EUR or USD, to filter the result.
         * @format string
         */
        currency_code?: string;
      },
      params: RequestParams = {},
    ) =>
      this.request<
        BasicSummary,
        | BadRequestResponse
        | UnauthenticatedResponse
        | NotFoundResponse
        | InternalExceptionResponse
      >({
        path: `/v1/summary/basic`,
        method: 'GET',
        query: query,
        secure: true,
        format: 'json',
        ...params,
      }),

    /**
     * @description Returns general system information and versions of the (supporting) software.
     *
     * @tags about
     * @name GetAbout
     * @summary System information end point.
     * @request GET:/v1/about
     * @secure
     */
    getAbout: (params: RequestParams = {}) =>
      this.request<
        SystemInfo,
        | BadRequestResponse
        | UnauthenticatedResponse
        | NotFoundResponse
        | InternalExceptionResponse
      >({
        path: `/v1/about`,
        method: 'GET',
        secure: true,
        format: 'json',
        ...params,
      }),

    /**
     * @description Returns the currently authenticated user.
     *
     * @tags about
     * @name GetCurrentUser
     * @summary Currently authenticated user endpoint.
     * @request GET:/v1/about/user
     * @secure
     */
    getCurrentUser: (params: RequestParams = {}) =>
      this.request<
        UserSingle,
        | BadRequestResponse
        | UnauthenticatedResponse
        | NotFoundResponse
        | InternalExceptionResponse
      >({
        path: `/v1/about/user`,
        method: 'GET',
        secure: true,
        format: 'json',
        ...params,
      }),

    /**
     * @description Returns all editable and not-editable configuration values for this Firefly III installation
     *
     * @tags configuration
     * @name GetConfiguration
     * @summary Get Firefly III system configuration values.
     * @request GET:/v1/configuration
     * @secure
     */
    getConfiguration: (params: RequestParams = {}) =>
      this.request<
        ConfigurationArray,
        | BadRequestResponse
        | UnauthenticatedResponse
        | NotFoundResponse
        | InternalExceptionResponse
      >({
        path: `/v1/configuration`,
        method: 'GET',
        secure: true,
        format: 'json',
        ...params,
      }),

    /**
     * @description Returns one configuration variable for this Firefly III installation
     *
     * @tags configuration
     * @name GetSingleConfiguration
     * @summary Get a single Firefly III system configuration value
     * @request GET:/v1/configuration/{name}
     * @secure
     */
    getSingleConfiguration: (
      name: ConfigValueFilter,
      params: RequestParams = {},
    ) =>
      this.request<
        ConfigurationSingle,
        | BadRequestResponse
        | UnauthenticatedResponse
        | NotFoundResponse
        | InternalExceptionResponse
      >({
        path: `/v1/configuration/${name}`,
        method: 'GET',
        secure: true,
        format: 'json',
        ...params,
      }),

    /**
     * @description Set a single configuration value. Not all configuration values can be updated so the list of accepted configuration variables is small.
     *
     * @tags configuration
     * @name SetConfiguration
     * @summary Update configuration value
     * @request PUT:/v1/configuration/{name}
     * @secure
     */
    setConfiguration: (
      name: ConfigValueUpdateFilter,
      data: ConfigurationUpdate,
      params: RequestParams = {},
    ) =>
      this.request<
        ConfigurationSingle,
        | BadRequestResponse
        | UnauthenticatedResponse
        | NotFoundResponse
        | ValidationErrorResponse
        | InternalExceptionResponse
      >({
        path: `/v1/configuration/${name}`,
        method: 'PUT',
        body: data,
        secure: true,
        type: ContentType.Json,
        format: 'json',
        ...params,
      }),

    /**
     * @description Firefly III has one endpoint for its various cron related tasks. Send a GET to this endpoint to run the cron. The cron requires the CLI token to be present. The cron job will fire for all users.
     *
     * @tags about
     * @name GetCron
     * @summary Cron job endpoint
     * @request GET:/v1/cron/{cliToken}
     * @secure
     */
    getCron: (
      cliToken: string,
      query?: {
        /**
         * A date formatted YYYY-MM-DD. This can be used to make the cron job pretend it's running
         * on another day.
         * @format date
         * @example "2018-09-17"
         */
        date?: string;
        /**
         * Forces the cron job to fire, regardless of whether it has fired before. This may result
         * in double transactions or weird budgets, so be careful.
         * @format boolean
         * @example false
         */
        force?: boolean;
      },
      params: RequestParams = {},
    ) =>
      this.request<
        CronResult,
        | BadRequestResponse
        | UnauthenticatedResponse
        | NotFoundResponse
        | InternalExceptionResponse
      >({
        path: `/v1/cron/${cliToken}`,
        method: 'GET',
        query: query,
        secure: true,
        format: 'json',
        ...params,
      }),

    /**
     * @description List all the users in this instance of Firefly III.
     *
     * @tags users
     * @name ListUser
     * @summary List all users.
     * @request GET:/v1/users
     * @secure
     */
    listUser: (
      query?: {
        /**
         * Number of items per page. The default pagination is per 50 items.
         * @format int32
         * @example 10
         */
        limit?: number;
        /**
         * Page number. The default pagination is per 50 items.
         * @format int32
         * @example 1
         */
        page?: number;
      },
      params: RequestParams = {},
    ) =>
      this.request<
        UserArray,
        | BadRequestResponse
        | UnauthenticatedResponse
        | NotFoundResponse
        | InternalExceptionResponse
      >({
        path: `/v1/users`,
        method: 'GET',
        query: query,
        secure: true,
        format: 'json',
        ...params,
      }),

    /**
     * @description Creates a new user. The data required can be submitted as a JSON body or as a list of parameters. The user will be given a random password, which they can reset using the "forgot password" function.
     *
     * @tags users
     * @name StoreUser
     * @summary Store a new user
     * @request POST:/v1/users
     * @secure
     */
    storeUser: (data: User, params: RequestParams = {}) =>
      this.request<
        UserSingle,
        | BadRequestResponse
        | UnauthenticatedResponse
        | NotFoundResponse
        | ValidationErrorResponse
        | InternalExceptionResponse
      >({
        path: `/v1/users`,
        method: 'POST',
        body: data,
        secure: true,
        type: ContentType.Json,
        format: 'json',
        ...params,
      }),

    /**
     * @description Gets all info of a single user.
     *
     * @tags users
     * @name GetUser
     * @summary Get a single user.
     * @request GET:/v1/users/{id}
     * @secure
     */
    getUser: (id: string, params: RequestParams = {}) =>
      this.request<
        UserSingle,
        | BadRequestResponse
        | UnauthenticatedResponse
        | NotFoundResponse
        | InternalExceptionResponse
      >({
        path: `/v1/users/${id}`,
        method: 'GET',
        secure: true,
        format: 'json',
        ...params,
      }),

    /**
     * @description Update existing user.
     *
     * @tags users
     * @name UpdateUser
     * @summary Update an existing user's information.
     * @request PUT:/v1/users/{id}
     * @secure
     */
    updateUser: (id: string, data: User, params: RequestParams = {}) =>
      this.request<
        UserSingle,
        | BadRequestResponse
        | UnauthenticatedResponse
        | NotFoundResponse
        | ValidationErrorResponse
        | InternalExceptionResponse
      >({
        path: `/v1/users/${id}`,
        method: 'PUT',
        body: data,
        secure: true,
        type: ContentType.Json,
        format: 'json',
        ...params,
      }),

    /**
     * @description Delete a user. You cannot delete the user you're authenticated with. This cannot be undone. Be careful!
     *
     * @tags users
     * @name DeleteUser
     * @summary Delete a user.
     * @request DELETE:/v1/users/{id}
     * @secure
     */
    deleteUser: (id: string, params: RequestParams = {}) =>
      this.request<
        void,
        | BadRequestResponse
        | UnauthenticatedResponse
        | NotFoundResponse
        | InternalExceptionResponse
      >({
        path: `/v1/users/${id}`,
        method: 'DELETE',
        secure: true,
        ...params,
      }),

    /**
     * @description List all of the preferences of the user.
     *
     * @tags preferences
     * @name ListPreference
     * @summary List all users preferences.
     * @request GET:/v1/preferences
     * @secure
     */
    listPreference: (
      query?: {
        /**
         * Number of items per page. The default pagination is per 50 items.
         * @format int32
         * @example 10
         */
        limit?: number;
        /**
         * Page number. The default pagination is per 50 items.
         * @format int32
         * @example 1
         */
        page?: number;
      },
      params: RequestParams = {},
    ) =>
      this.request<
        PreferenceArray,
        | BadRequestResponse
        | UnauthenticatedResponse
        | NotFoundResponse
        | InternalExceptionResponse
      >({
        path: `/v1/preferences`,
        method: 'GET',
        query: query,
        secure: true,
        format: 'json',
        ...params,
      }),

    /**
     * @description This endpoint creates a new preference. The name and data are free-format, and entirely up to you. If the preference is not used in Firefly III itself it may not be configurable through the user interface, but you can use this endpoint to persist custom data for your own app.
     *
     * @tags preferences
     * @name StorePreference
     * @summary Store a new preference for this user.
     * @request POST:/v1/preferences
     * @secure
     */
    storePreference: (data: Preference, params: RequestParams = {}) =>
      this.request<
        PreferenceSingle,
        | BadRequestResponse
        | UnauthenticatedResponse
        | NotFoundResponse
        | ValidationErrorResponse
        | InternalExceptionResponse
      >({
        path: `/v1/preferences`,
        method: 'POST',
        body: data,
        secure: true,
        type: ContentType.Json,
        format: 'json',
        ...params,
      }),

    /**
     * @description Return a single preference and the value.
     *
     * @tags preferences
     * @name GetPreference
     * @summary Return a single preference.
     * @request GET:/v1/preferences/{name}
     * @secure
     */
    getPreference: (name: string, params: RequestParams = {}) =>
      this.request<
        PreferenceSingle,
        | BadRequestResponse
        | UnauthenticatedResponse
        | NotFoundResponse
        | InternalExceptionResponse
      >({
        path: `/v1/preferences/${name}`,
        method: 'GET',
        secure: true,
        format: 'json',
        ...params,
      }),

    /**
     * @description Update a user's preference.
     *
     * @tags preferences
     * @name UpdatePreference
     * @summary Update preference
     * @request PUT:/v1/preferences/{name}
     * @secure
     */
    updatePreference: (
      name: string,
      data: PreferenceUpdate,
      params: RequestParams = {},
    ) =>
      this.request<
        PreferenceSingle,
        | BadRequestResponse
        | UnauthenticatedResponse
        | NotFoundResponse
        | ValidationErrorResponse
        | InternalExceptionResponse
      >({
        path: `/v1/preferences/${name}`,
        method: 'PUT',
        body: data,
        secure: true,
        type: ContentType.Json,
        format: 'json',
        ...params,
      }),

    /**
     * @description When a webhook is triggered the actual message that will be send is stored in a "message". You can view and analyse these messages.
     *
     * @tags webhooks
     * @name GetWebhookMessages
     * @summary Get all the messages of a single webhook.
     * @request GET:/v1/webhooks/{id}/messages
     * @secure
     */
    getWebhookMessages: (id: string, params: RequestParams = {}) =>
      this.request<
        WebhookMessageArray,
        | BadRequestResponse
        | UnauthenticatedResponse
        | NotFoundResponse
        | InternalExceptionResponse
      >({
        path: `/v1/webhooks/${id}/messages`,
        method: 'GET',
        secure: true,
        format: 'json',
        ...params,
      }),

    /**
     * @description When a webhook is triggered it will store the actual content of the webhook in a webhook message. You can view and analyse a single one using this endpoint.
     *
     * @tags webhooks
     * @name GetSingleWebhookMessage
     * @summary Get a single message from a webhook.
     * @request GET:/v1/webhooks/{id}/messages/{messageId}
     * @secure
     */
    getSingleWebhookMessage: (
      id: string,
      messageId: number,
      params: RequestParams = {},
    ) =>
      this.request<
        WebhookMessageSingle,
        | BadRequestResponse
        | UnauthenticatedResponse
        | NotFoundResponse
        | InternalExceptionResponse
      >({
        path: `/v1/webhooks/${id}/messages/${messageId}`,
        method: 'GET',
        secure: true,
        format: 'json',
        ...params,
      }),

    /**
     * @description Delete a webhook message. Any time a webhook is triggered the message is stored before it's sent. You can delete them before or after sending.
     *
     * @tags webhooks
     * @name DeleteWebhookMessage
     * @summary Delete a webhook message.
     * @request DELETE:/v1/webhooks/{id}/messages/{messageId}
     * @secure
     */
    deleteWebhookMessage: (
      id: string,
      messageId: number,
      params: RequestParams = {},
    ) =>
      this.request<
        void,
        | BadRequestResponse
        | UnauthenticatedResponse
        | NotFoundResponse
        | InternalExceptionResponse
      >({
        path: `/v1/webhooks/${id}/messages/${messageId}`,
        method: 'DELETE',
        secure: true,
        ...params,
      }),

    /**
     * @description When a webhook message fails to send it will store the failure in an "attempt". You can view and analyse these. Webhook messages that receive too many attempts (failures) will not be sent again. You must first clear out old attempts before the message can go out again.
     *
     * @tags webhooks
     * @name GetWebhookMessageAttempts
     * @summary Get all the failed attempts of a single webhook message.
     * @request GET:/v1/webhooks/{id}/messages/{messageId}/attempts
     * @secure
     */
    getWebhookMessageAttempts: (
      id: string,
      messageId: number,
      query?: {
        /**
         * Number of items per page. The default pagination is per 50 items.
         * @format int32
         * @example 10
         */
        limit?: number;
        /**
         * Page number. The default pagination is per 50 items.
         * @format int32
         * @example 1
         */
        page?: number;
      },
      params: RequestParams = {},
    ) =>
      this.request<
        WebhookAttemptArray,
        | BadRequestResponse
        | UnauthenticatedResponse
        | NotFoundResponse
        | InternalExceptionResponse
      >({
        path: `/v1/webhooks/${id}/messages/${messageId}/attempts`,
        method: 'GET',
        query: query,
        secure: true,
        format: 'json',
        ...params,
      }),

    /**
     * @description When a webhook message fails to send it will store the failure in an "attempt". You can view and analyse these. Webhooks messages that receive too many attempts (failures) will not be fired. You must first clear out old attempts and try again. This endpoint shows you the details of a single attempt. The ID of the attempt must match the corresponding webhook and webhook message.
     *
     * @tags webhooks
     * @name GetSingleWebhookMessageAttempt
     * @summary Get a single failed attempt from a single webhook message.
     * @request GET:/v1/webhooks/{id}/messages/{messageId}/attempts/{attemptId}
     * @secure
     */
    getSingleWebhookMessageAttempt: (
      id: string,
      messageId: number,
      attemptId: number,
      params: RequestParams = {},
    ) =>
      this.request<
        WebhookAttemptSingle,
        | BadRequestResponse
        | UnauthenticatedResponse
        | NotFoundResponse
        | InternalExceptionResponse
      >({
        path: `/v1/webhooks/${id}/messages/${messageId}/attempts/${attemptId}`,
        method: 'GET',
        secure: true,
        format: 'json',
        ...params,
      }),

    /**
     * @description Delete a webhook message attempt. If you delete all attempts for a webhook message, Firefly III will (once again) assume all is well with the webhook message and will try to send it again.
     *
     * @tags webhooks
     * @name DeleteWebhookMessageAttempt
     * @summary Delete a webhook attempt.
     * @request DELETE:/v1/webhooks/{id}/messages/{messageId}/attempts/{attemptId}
     * @secure
     */
    deleteWebhookMessageAttempt: (
      id: string,
      messageId: number,
      attemptId: number,
      params: RequestParams = {},
    ) =>
      this.request<
        void,
        | BadRequestResponse
        | UnauthenticatedResponse
        | NotFoundResponse
        | InternalExceptionResponse
      >({
        path: `/v1/webhooks/${id}/messages/${messageId}/attempts/${attemptId}`,
        method: 'DELETE',
        secure: true,
        ...params,
      }),

    /**
     * @description This endpoint will submit any open messages for this webhook. This is an asynchronous operation, so you can't see the result. Refresh the webhook message and/or the webhook message attempts to see the results. This may take some time if the webhook receiver is slow.
     *
     * @tags webhooks
     * @name SubmitWebook
     * @summary Submit messages for a webhook.
     * @request POST:/v1/webhooks/{id}/submit
     * @secure
     */
    submitWebook: (id: string, params: RequestParams = {}) =>
      this.request<void, void>({
        path: `/v1/webhooks/${id}/submit`,
        method: 'POST',
        secure: true,
        ...params,
      }),

    /**
     * @description This endpoint will execute this webhook for a given transaction ID. This is an asynchronous operation, so you can't see the result. Refresh the webhook message and/or the webhook message attempts to see the results. This may take some time if the webhook receiver is slow.
     *
     * @tags webhooks
     * @name TriggerTransactionWebhook
     * @summary Trigger webhook for a given transaction.
     * @request POST:/v1/webhooks/{id}/trigger-transaction/{transactionId}
     * @secure
     */
    triggerTransactionWebhook: (
      id: string,
      transactionId: string,
      params: RequestParams = {},
    ) =>
      this.request<void, void>({
        path: `/v1/webhooks/${id}/trigger-transaction/${transactionId}`,
        method: 'POST',
        secure: true,
        ...params,
      }),

    /**
     * @description List all the user's webhooks.
     *
     * @tags webhooks
     * @name ListWebhook
     * @summary List all webhooks.
     * @request GET:/v1/webhooks
     * @secure
     */
    listWebhook: (
      query?: {
        /**
         * Number of items per page. The default pagination is per 50 items.
         * @format int32
         * @example 10
         */
        limit?: number;
        /**
         * Page number. The default pagination is per 50 items.
         * @format int32
         * @example 1
         */
        page?: number;
      },
      params: RequestParams = {},
    ) =>
      this.request<
        WebhookArray,
        | BadRequestResponse
        | UnauthenticatedResponse
        | NotFoundResponse
        | InternalExceptionResponse
      >({
        path: `/v1/webhooks`,
        method: 'GET',
        query: query,
        secure: true,
        format: 'json',
        ...params,
      }),

    /**
     * @description Creates a new webhook. The data required can be submitted as a JSON body or as a list of parameters. The webhook will be given a random secret.
     *
     * @tags webhooks
     * @name StoreWebhook
     * @summary Store a new webhook
     * @request POST:/v1/webhooks
     * @secure
     */
    storeWebhook: (data: WebhookStore, params: RequestParams = {}) =>
      this.request<
        WebhookSingle,
        | BadRequestResponse
        | UnauthenticatedResponse
        | NotFoundResponse
        | ValidationErrorResponse
        | InternalExceptionResponse
      >({
        path: `/v1/webhooks`,
        method: 'POST',
        body: data,
        secure: true,
        type: ContentType.Json,
        format: 'json',
        ...params,
      }),

    /**
     * @description Gets all info of a single webhook.
     *
     * @tags webhooks
     * @name GetWebhook
     * @summary Get a single webhook.
     * @request GET:/v1/webhooks/{id}
     * @secure
     */
    getWebhook: (id: string, params: RequestParams = {}) =>
      this.request<
        WebhookSingle,
        | BadRequestResponse
        | UnauthenticatedResponse
        | NotFoundResponse
        | InternalExceptionResponse
      >({
        path: `/v1/webhooks/${id}`,
        method: 'GET',
        secure: true,
        format: 'json',
        ...params,
      }),

    /**
     * @description Update an existing webhook's information. If you wish to reset the secret, submit any value as the "secret". Firefly III will take this as a hint and reset the secret of the webhook.
     *
     * @tags webhooks
     * @name UpdateWebhook
     * @summary Update existing webhook.
     * @request PUT:/v1/webhooks/{id}
     * @secure
     */
    updateWebhook: (
      id: string,
      data: WebhookUpdate,
      params: RequestParams = {},
    ) =>
      this.request<
        WebhookSingle,
        | BadRequestResponse
        | UnauthenticatedResponse
        | NotFoundResponse
        | ValidationErrorResponse
        | InternalExceptionResponse
      >({
        path: `/v1/webhooks/${id}`,
        method: 'PUT',
        body: data,
        secure: true,
        type: ContentType.Json,
        format: 'json',
        ...params,
      }),

    /**
     * @description Delete a webhook.
     *
     * @tags webhooks
     * @name DeleteWebhook
     * @summary Delete a webhook.
     * @request DELETE:/v1/webhooks/{id}
     * @secure
     */
    deleteWebhook: (id: string, params: RequestParams = {}) =>
      this.request<
        void,
        | BadRequestResponse
        | UnauthenticatedResponse
        | NotFoundResponse
        | InternalExceptionResponse
      >({
        path: `/v1/webhooks/${id}`,
        method: 'DELETE',
        secure: true,
        ...params,
      }),
  };
}
