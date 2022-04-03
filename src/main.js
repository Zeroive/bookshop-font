import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import {Badge, Swipe, SwipeItem,Sidebar,
    SidebarItem,Tab,Tabs,Card,Button,Tag,
    Toast,Image as vanImage, Form, Field,
    CellGroup,Cell,Checkbox,SwipeCell,Icon,
    Row,Popup,Sticky
} from "vant";

createApp(App)
    .use(store).use(router)
    .use(Swipe).use(SwipeItem).use(Badge).use(Sidebar)
    .use(SidebarItem).use(Tab).use(Tabs).use(Card)
    .use(Button).use(Tag).use(Toast).use(vanImage)
    .use(Form).use(Field).use(CellGroup).use(Cell)
    .use(Checkbox).use(SwipeCell).use(Icon).use(Row)
    .use(Popup).use(Sticky)
    .mount('#app')
