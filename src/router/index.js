import {
  createRouter,
  createWebHashHistory
} from 'vue-router'

import Tutorial from "../views/Tutorial/Tutorial"
import Camera from "../views/Camera/Camera"
import Photo from "../views/Photo/Photo"

const routes = [{
    path: '/',
    name: 'Tutorial',
    component: Tutorial
  },
  {
    path: '/camara',
    name: 'Camera',
    component: Camera
  },
  {
    path: '/foto/:photo',
    name: 'Photo',
    component: Photo
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router