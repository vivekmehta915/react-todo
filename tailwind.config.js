/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        'task-bg-when-checked': 'rgb(232 255 225)', //task background color if checked (completed) 
        'task-border-when-checked': 'rgb(97 175 123 / 75%)', // task botder color if checked (completed)
        'active-color': '#54ac35' //filters buttons active color
      },
    },
  },
  plugins: [],
}
