export function useCustomTheme() {
  const { $vuetify } = useNuxtApp()

  const isDark = useDark({
    valueDark: 'dark',
    valueLight: 'light',
    initialValue: 'dark',
    onChanged: (dark: boolean) => {
      const vuetifTheme = $vuetify.theme.global.name.value
      if (dark && vuetifTheme !== 'dark') {
        return $vuetify.theme.change('light')
      }
      else {
        return $vuetify.theme.change('dark')
      }
    },
  })

  const toggle = useToggle(isDark)

  return { isDark, toggle }
}
