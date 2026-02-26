import '@adonisjs/core/types/http'

type ParamValue = string | number | bigint | boolean

export type ScannedRoutes = {
  ALL: {
    'assets.index': { paramsTuple?: []; params?: {} }
    'assets.store': { paramsTuple?: []; params?: {} }
    'assets.show': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'assets.update': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'assets.destroy': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
  }
  GET: {
    'assets.index': { paramsTuple?: []; params?: {} }
    'assets.show': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
  }
  HEAD: {
    'assets.index': { paramsTuple?: []; params?: {} }
    'assets.show': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
  }
  POST: {
    'assets.store': { paramsTuple?: []; params?: {} }
  }
  PUT: {
    'assets.update': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
  }
  DELETE: {
    'assets.destroy': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
  }
}
declare module '@adonisjs/core/types/http' {
  export interface RoutesList extends ScannedRoutes {}
}