import { createContext, useReducer, useEffect } from "react";

type Theme = 'dark' | 'light'

type State = {
    theme: Theme
}

type Action = | {type: 'SET_DARK'} | {type: 'SET_LIGHT'}
type ThemeContextType = {
    theme: Theme
    dispatch: React.Dispatch<Action>
}

const themeReducer = (state: State, action: Action): State => {
    switch(action.type){
        case 'SET_DARK':
            return {theme: 'dark'}
        case 'SET_LIGHT':
            return {theme: 'light'}
        default: 
            return state
    }
}

export const ThemeContext = createContext<ThemeContextType | null>(null)

export const ThemeProvider = ({children}: {children: React.ReactNode}) =>{
    const savedTheme = (localStorage.getItem('theme') as Theme) || 'light'
    const [state, dispatch] = useReducer(themeReducer, {theme: savedTheme})

    useEffect(() => {
        const root = document.documentElement
        if (state.theme == 'dark'){
            root.classList.add('dark')
        }   
        else {
            root.classList.remove('dark')
        }
        localStorage.setItem('theme', state.theme)
    }, [state.theme])

    return (
        <ThemeContext.Provider value={{ theme: state.theme, dispatch }}>
            {children}
        </ThemeContext.Provider>
    )
}
