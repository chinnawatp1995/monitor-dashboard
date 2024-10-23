import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import SideBar from './components/SideBar.vue'
import FilterBar from './components/FilterBar.vue'
import Header from './components/Header.vue'
import ServerStatus from './components/charts/ServerStatus.vue'
import CpuUsage from './components/charts/CpuUsage.vue'
import MemUsage from './components/charts/MemUsage.vue'
import RequestPath from './components/charts/RequestPath.vue'
import TotalRequest from './components/charts/TotalRequest.vue'
import ErrorToReq from './components/charts/ErrorToReq.vue'
import ErrorRanking from './components/charts/ErrorRanking.vue'
import ResponseDist from './components/charts/ResponseDist.vue'
import ResponseAvg from './components/charts/ResponseAvg.vue'

import App from './App.vue'
import router from './router'

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

import Aura from '@primevue/themes/aura'
import Lara from '@primevue/themes/lara'

import Chart from 'primevue/chart'

const app = createApp(App)
app.use(PrimeVue, {
  theme: {
    preset: Lara,
    options: {
      darkModeSelector: false || 'none',
    },
  },
})
app.component('Sidebar', Sidebar)
app.component('Button', Button)
app.component('Menubar', Menubar)
app.component('IconField', IconField)
app.component('InputIcon', InputIcon)
app.component('InputText', InputText)
app.component('Dropdown', Dropdown)
app.component('DataTable', DataTable)
app.component('Column', Column)
app.component('ColumnGroup', ColumnGroup)
app.component('Row', Row)
app.component('Calendar', Calendar)
app.component('SelectButton', SelectButton)
app.component('Badge', Badge)

app.component('SideBar', SideBar)
app.component('FilterBar', FilterBar)
app.component('Header', Header)
app.component('ServerStatus', ServerStatus)
app.component('CpuUsage', CpuUsage)
app.component('MemUsage', MemUsage)
app.component('RequestPath', RequestPath)
app.component('TotalRequest', TotalRequest)
app.component('ErrorToReq', ErrorToReq)
app.component('ErrorRanking', ErrorRanking)
app.component('ResponseDist', ResponseDist)
app.component('ResponseAvg', ResponseAvg)

app.component('Chart', Chart)

app.use(createPinia())
app.use(router)

app.mount('#app')
