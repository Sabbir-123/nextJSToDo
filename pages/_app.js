import AuthpProvider from '../Components/Context/AuthProvider'
import Layout from '../Components/Layout/Layout'
import '../styles/globals.css'
import {
  QueryClient,
  QueryClientProvider
} from "@tanstack/react-query";
const queryClient = new QueryClient();
import { ThemeProvider } from 'next-themes';
export default function App({ Component, pageProps }) {
  return (
<ThemeProvider enableSystem={true} attribute="class">
<QueryClientProvider client={queryClient}>
    <AuthpProvider>
     <Layout>
      <Component {...pageProps} />
    </Layout>
   </AuthpProvider>
 </QueryClientProvider>
</ThemeProvider>
  )
}
