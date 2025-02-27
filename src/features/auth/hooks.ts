import {
  useDispatch,
  useSelector,
  type TypedUseSelectorHook,
} from 'react-redux';
import { AppDispatch, RootState } from '../../store';

type DispatchFunction = () => AppDispatch;

export const useAuthDispatch: DispatchFunction = useDispatch;
export const useAuthSelector: TypedUseSelectorHook<RootState> = useSelector;
