/* eslint-disable */
import * as Router from 'expo-router';

export * from 'expo-router';

declare module 'expo-router' {
  export namespace ExpoRouter {
    export interface __routes<T extends string = string> extends Record<string, unknown> {
      StaticRoutes: `/` | `/_sitemap` | `/aparelhos` | `/boletos` | `/consumo` | `/entrar` | `/graficos` | `/home` | `/metas` | `/recepcao` | `/registro`;
      DynamicRoutes: never;
      DynamicRouteTemplate: never;
    }
  }
}
