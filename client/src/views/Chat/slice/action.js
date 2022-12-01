import { createAction } from '@reduxjs/toolkit'

export const initSocketAction = createAction('spreadWords/Chat/initial')
export const closeSocketAction = createAction('spreadWords/Chat/close')

export const sendMessageAction = createAction('spreadWords/Chat/sendMessage')
