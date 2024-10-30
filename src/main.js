import './assets/main.css'
import { createApp } from 'vue'
import { createPinia } from 'pinia'

import PrimeVue from 'primevue/config'
import Sidebar from 'primevue/sidebar'
import Button from 'primevue/button'
import Menubar from 'primevue/menubar'
import IconField from 'primevue/iconfield'
import InputIcon from 'primevue/inputicon'
import InputText from 'primevue/inputtext'
import Dropdown from 'primevue/dropdown'
import DataTable from 'primevue/datatable'
import Column from 'primevue/column'
import ColumnGroup from 'primevue/columngroup' // optional
import Row from 'primevue/row'
import Calendar from 'primevue/calendar'
import SelectButton from 'primevue/selectbutton'
import Badge from 'primevue/badge'
import Chart from 'primevue/chart'
import Aura from '@primevue/themes/aura'
import Lara from '@primevue/themes/lara'
import Dialog from 'primevue/dialog'
import router from './router'
import App from './App.vue'

import {
  SideBar,
  FilterBar,
  Header,
  ServerStatus,
  CpuUsage,
  MemUsage,
  RequestPath,
  TotalRequest,
  ErrorToReq,
  ErrorRanking,
  ResponseDist,
  ResponseAvg,
  ChartFilter,
  ChartWrapper,
  RxNetworkUsage,
  TxNetworkUsage,
} from './components'

const app = createApp(App)

app.use(PrimeVue, {
  theme: {
    preset: Lara,
    options: { darkModeSelector: false || 'none' },
  },
})

const primeComponents = {
  Sidebar,
  Button,
  Menubar,
  IconField,
  InputIcon,
  InputText,
  Dropdown,
  DataTable,
  Column,
  ColumnGroup,
  Row,
  Calendar,
  SelectButton,
  Badge,
  Chart,
  Dialog,
}

Object.entries(primeComponents).forEach(([name, component]) => {
  app.component(name, component)
})

const customComponents = {
  SideBar,
  FilterBar,
  Header,
  ServerStatus,
  CpuUsage,
  MemUsage,
  RequestPath,
  TotalRequest,
  ErrorToReq,
  ErrorRanking,
  ResponseDist,
  ResponseAvg,
  ChartFilter,
  ChartWrapper,
  RxNetworkUsage,
  TxNetworkUsage,
}

Object.entries(customComponents).forEach(([name, component]) => {
  app.component(name, component)
})

app.use(createPinia())
app.use(router)

// Mount app
app.mount('#app')
