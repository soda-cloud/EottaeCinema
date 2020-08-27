import {createActions, handleActions} from 'redux-actions';
import {put,call,takeLatest} from 'redux-saga/effects';
import theaterService from '../../Services/theaterService';

const initState={
  loading: false,
  theaters:[
    {"서울":["가양","수유","영등포"]},
    {"경기/인천":["검단","부평"]},
    {"충청/대전":["서산","아산터미널"]},
    {"전라/광주":["광주(백화점)","전주(백화점)"]},
    {"경북/대구":["동성로","포항"]},
    {"경남/부산/울산":["대영","센텀시티"]},
    {"강원":["동해","춘천"]},
    {"제주":["서귀포","제주심화지구"]},
  ],
  selectedTheaters:[],
  selectedMoiveData:[],
  error:null
}

const {start, success, fail} = createActions(
  {
    SUCCESS: (selectedTheaters,selectedMoiveData) => ({selectedTheaters,selectedMoiveData})
  },
  "START",
  "FAIL",
  {
    prefix:'theatersStore'
  }
)

const theaters = handleActions({
    START: (state) => ({
      loading:true, 
      theaters: state.theaters,
      selectedTheaters: [],
      selectedMoiveData:[],
      error:null
    }),
    SUCCESS: (state,action) => ({
      loading:false, 
      theaters: state.theaters,
      selectedTheaters: action.payload.selectedTheaters,
      selectedMoiveData:action.payload.selectedMoiveData,
      error:null
    }),
    FAIL: (state,action) => ({
      loading:false, 
      theaters: state.theaters,
      selectedTheaters: [],
      selectedMoiveData:[],
      error: action.payload.error
    })
  },
  initState,
  {
    prefix:'theatersStore'
  }
)

export default theaters;

const GET_SELECET_DATA_SAGA_START = "GET_SELECET_DATA_SAGA_START";

export const getSelecetDataAction = (date,title,point)=>({
  type: GET_SELECET_DATA_SAGA_START,
  payload: {
    date,
    title,
    point
  }
});

function* startGetSelectDataSaga(action) {
  const {date,title,point} = action.payload;
  try {
    yield put(start());
    const selectedMoiveData = yield call(theaterService.getTheater,date,title,point);
    console.log(selectedMoiveData)
    const selectedTheaters = selectedMoiveData.map(data =>({
      [data.locationName]:data.theaterLocation
    }))
    yield put(success(selectedTheaters,selectedMoiveData));
  }catch(error){
    console.log(error)
    yield put(fail(error))
  }
}

export function* theaterSaga(){
  yield takeLatest(GET_SELECET_DATA_SAGA_START,startGetSelectDataSaga)
}