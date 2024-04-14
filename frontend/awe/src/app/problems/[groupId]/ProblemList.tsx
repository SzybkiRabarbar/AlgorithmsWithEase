'use client'

import styles from './ProblemList.module.scss';
import fetchDataFromSerer from '@/utils/fetchDataFromServer';
import { ProblemsHashMapInterface } from '@/utils/interfaces/ProblemsByGroupIdMapInterface';
import Loading from '@/components/loading/Loading';
import RenderProblemContent from '@/components/render-problem-content/RenderProblemContent';
import HoverEffectWrapper from '@/components/magical-hover-effect/hover-effect-wrapper/HoverEffectWrapper';
import HoverEffectElement from '@/components/magical-hover-effect/hover-effect-element/HoverEffectElement';


function ProblemList(params: {groupId: string}) {

  const {
    data: problemsMapData,
    error: problemsError,
    isLoading: problemsIsLoading
  } =
    fetchDataFromSerer<ProblemsHashMapInterface>(
      "/api/content/problems/group/" + params.groupId
    );

  const RenderProblems = (props: {important: boolean}) => {
    return (<>
      {problemsMapData &&
        Object.entries(problemsMapData).map(([key, val]) => (
          Boolean(val.important) === props.important &&
            <HoverEffectElement>
              <RenderProblemContent fireId={key} content={val}/>
            </HoverEffectElement>
        ))
    }
    </>)
  }

  return (
    <div className={styles.ProblemList}>
      {problemsIsLoading ? (
        <Loading />
      ) : (
        <HoverEffectWrapper>
          <h1>Important:</h1>
          <RenderProblems important={true} />
          <h1>Nice to have:</h1>
          <RenderProblems important={false} />
          {problemsError &&
            <p>Error</p>
          }
        </HoverEffectWrapper>
      )}
    </div>
  )
}

export default ProblemList