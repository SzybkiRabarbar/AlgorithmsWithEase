'use client'

import styles from './ProblemList.module.scss';
import fetchDataFromSerer from '@/utils/fetchDataFromServer';
import ProblemsHashMapInterface from '@/utils/interfaces/ProblemsByGroupIdMapInterface';
import Loading from '@/components/loading/Loading';


function ProblemList(params: {groupId: string}) {

  const {
    data: problemsMapData,
    error: problemsError,
    isLoading: problemsIsLoading
  } =
    fetchDataFromSerer<ProblemsHashMapInterface>(
      "/api/content/problems/group/" + params.groupId
    );

  return (
    <div className={styles.ProblemList}>
      {/* <span>{`${problemsMapData ? Object.keys(problemsMapData) : problemsError}`}</span> */}
      {problemsIsLoading ? (
        <Loading />
      ) : (<>
        {problemsMapData &&
          Object.entries(problemsMapData).map(([key, val]) => (
            <h3>{ key }</h3>
          ))
        }
        {problemsError &&
          <p>Error</p>
        }
      </>)}
    </div>
  )
}

export default ProblemList