import Balances from '@/components/Balances';
import Box from '@mui/material/Box'
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import theme from '@/styles/theme';
import { TransactionsProvider } from '@/context/transactionProvider';
import { ApiProvider } from '@/context/apiProvider';
import useApi from '@/hooks/useApi';
import Loader from '@/components/Loader';
import Dashboard from './views/Dashboard';

export default function Home() {
  // const {loading} = useApi();

  return (
    <TransactionsProvider>
      <ApiProvider>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <Dashboard/>
        </ThemeProvider>
      </ApiProvider>
    </TransactionsProvider>
  );
}
