import LiveClassRoom from '../composable/live-class/LiveClassRoom.vue'

export const liveClassRoutes = [
  {
    path: '/live-class/:id',
    name: 'LiveClassRoom',
    component: LiveClassRoom,
    meta: { requiresAuth: true },
  },
  {
    path: '/student/live-class/:id',
    name: 'StudentLiveClassRoom',
    component: LiveClassRoom,
    meta: { requiresAuth: true, role: 'student' },
  },
  {
    path: '/admin/live-classes/:id/room',
    name: 'AdminLiveClassRoom',
    component: LiveClassRoom,
    meta: { requiresAuth: true, role: 'admin' },
  },
]

export default liveClassRoutes
