'use strict';

const path = require('path');

exports.path = path.join(__dirname, 'src');
exports.wsdl = exports.netsuiteWsdl = path.join(exports.path, 'netsuite.wsdl');
exports.version = '2016_2';

exports.operations = [
  "add",
  "addList",
  "asyncAddList",
  "asyncDeleteList",
  "asyncGetList",
  "asyncInitializeList",
  "asyncSearch",
  "asyncUpdateList",
  "asyncUpsertList",
  "attach",
  "changeEmail",
  "changePassword",
  "checkAsyncStatus",
  "delete",
  "deleteList",
  "detach",
  "get",
  "getAll",
  "getAsyncResult",
  "getBudgetExchangeRate",
  "getConsolidatedExchangeRate",
  "getCurrencyRate",
  "getCustomizationId",
  "getDataCenterUrls",
  "getDeleted",
  "getItemAvailability",
  "getList",
  "getPostingTransactionSummary",
  "getSavedSearch",
  "getSelectValue",
  "getServerTime",
  "initialize",
  "initializeList",
  "login",
  "logout",
  "mapSso",
  "search",
  "searchMore",
  "searchMoreWithId",
  "searchNext",
  "ssoLogin",
  "update",
  "updateInviteeStatus",
  "updateInviteeStatusList",
  "updateList",
  "upsert",
  "upsertList",
];

exports.namespaces = {
  // Namespace prefix : Namespace URI
  "actSched"          : "urn:scheduling_2016_2.activities.webservices.netsuite.com",
  "demandPlanning"    : "urn:demandplanning_2016_2.transactions.webservices.netsuite.com",
  "docFileCab"        : "urn:filecabinet_2016_2.documents.webservices.netsuite.com",
  "generalComm"       : "urn:communication_2016_2.general.webservices.netsuite.com",
  "listAcct"          : "urn:accounting_2016_2.lists.webservices.netsuite.com",
  "listEmp"           : "urn:employees_2016_2.lists.webservices.netsuite.com",
  "listMkt"           : "urn:marketing_2016_2.lists.webservices.netsuite.com",
  "listRel"           : "urn:relationships_2016_2.lists.webservices.netsuite.com",
  "listScm"           : "urn:supplychain_2016_2.lists.webservices.netsuite.com",
  "listSite"          : "urn:website_2016_2.lists.webservices.netsuite.com",
  "listSupport"       : "urn:support_2016_2.lists.webservices.netsuite.com",
  "platformCommon"    : "urn:common_2016_2.platform.webservices.netsuite.com",
  "platformCore"      : "urn:core_2016_2.platform.webservices.netsuite.com",
  "platformFaults"    : "urn:faults_2016_2.platform.webservices.netsuite.com",
  "platformMsgs"      : "urn:messages_2016_2.platform.webservices.netsuite.com",
  "setupCustom"       : "urn:customization_2016_2.setup.webservices.netsuite.com",
  "tns"               : "urn:platform_2016_2.webservices.netsuite.com",
  "tranBank"          : "urn:bank_2016_2.transactions.webservices.netsuite.com",
  "tranCust"          : "urn:customers_2016_2.transactions.webservices.netsuite.com",
  "tranEmp"           : "urn:employees_2016_2.transactions.webservices.netsuite.com",
  "tranFin"           : "urn:financial_2016_2.transactions.webservices.netsuite.com",
  "tranGeneral"       : "urn:general_2016_2.transactions.webservices.netsuite.com",
  "tranInvt"          : "urn:inventory_2016_2.transactions.webservices.netsuite.com",
  "tranPurch"         : "urn:purchases_2016_2.transactions.webservices.netsuite.com",
  "tranSales"         : "urn:sales_2016_2.transactions.webservices.netsuite.com",

  "actSchedTyp"       : "urn:types.scheduling_2016_2.activities.webservices.netsuite.com",
  "demandPlanningTyp" : "urn:types.demandplanning_2016_2.transactions.webservices.netsuite.com",
  "docFileCabTyp"     : "urn:types.filecabinet_2016_2.documents.webservices.netsuite.com",
  "generalCommTyp"    : "urn:types.communication_2016_2.general.webservices.netsuite.com",
  "listAcctTyp"       : "urn:types.accounting_2016_2.lists.webservices.netsuite.com",
  "listEmpTyp"        : "urn:types.employees_2016_2.lists.webservices.netsuite.com",
  "listMktTyp"        : "urn:types.marketing_2016_2.lists.webservices.netsuite.com",
  "listRelTyp"        : "urn:types.relationships_2016_2.lists.webservices.netsuite.com",
  "listScmTyp"        : "urn:types.supplychain_2016_2.lists.webservices.netsuite.com",
  "listSiteTyp"       : "urn:types.website_2016_2.lists.webservices.netsuite.com",
  "listSupportTyp"    : "urn:types.support_2016_2.lists.webservices.netsuite.com",
  "platformCommonTyp" : "urn:types.common_2016_2.platform.webservices.netsuite.com",
  "platformCoreTyp"   : "urn:types.core_2016_2.platform.webservices.netsuite.com",
  "platformFaultTyp"  : "urn:types.faults_2016_2.platform.webservices.netsuite.com",
  "setupCustomTyp"    : "urn:types.customization_2016_2.setup.webservices.netsuite.com",
  "tranBankTyp"       : "urn:types.bank_2016_2.transactions.webservices.netsuite.com",
  "tranCustomersTyp"  : "urn:types.customers_2016_2.transactions.webservices.netsuite.com",
  "tranCustTyp"       : "urn:types.customers_2016_2.transactions.webservices.netsuite.com",
  "tranEmployeesTyp"  : "urn:types.employees_2016_2.transactions.webservices.netsuite.com",
  "tranEmpTyp"        : "urn:types.employees_2016_2.transactions.webservices.netsuite.com",
  "tranFinancialTyp"  : "urn:types.financial_2016_2.transactions.webservices.netsuite.com",
  "tranFinTyp"        : "urn:types.financial_2016_2.transactions.webservices.netsuite.com",
  "tranInvtTyp"       : "urn:types.inventory_2016_2.transactions.webservices.netsuite.com",
  "tranPurchTyp"      : "urn:types.purchases_2016_2.transactions.webservices.netsuite.com",
  "tranSalesTyp"      : "urn:types.sales_2016_2.transactions.webservices.netsuite.com",
};
