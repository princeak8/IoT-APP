declare module 'vue3-apexcharts' {
    import { DefineComponent } from 'vue'
    const component: DefineComponent<{
      type: string,
      height: string | number,
      width: string | number,
      series: any,
      options: any
    }>
    export default component
  }