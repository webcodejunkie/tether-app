import '../styles/global.scss';
import '../styles/nprogress.scss';
import { wrapper, store } from '../store/store';
import { Provider } from 'react-redux';

function App({ Component, pageProps }) {

  const getLayout = Component.getLayout || ((page) => page)

  return getLayout(
    <Provider store={store}>
      <Component {...pageProps} />
    </Provider>
  )
}

export default wrapper.withRedux(App);