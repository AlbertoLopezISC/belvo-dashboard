import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import theme from '@/styles/theme';
import { TransactionsProvider } from '@/context/transactionProvider';
import { ApiProvider } from '@/context/apiProvider';
import Dashboard from './views/Dashboard';

export default function Home() {

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
