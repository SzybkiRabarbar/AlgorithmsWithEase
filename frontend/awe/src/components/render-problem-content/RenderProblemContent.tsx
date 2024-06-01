import ProgressStatusButton from '../progress-status-button/ProgressStatusButton';
import styles from './RenderProblemContent.module.scss';
import { ProblemInterface } from '@/utils/interfaces/ProblemsByGroupIdMapInterface';

import linkSolid from '/public/e7e7e7/link-solid.svg';
import Image from 'next/image';
import Link from 'next/link';


function RenderProblemContent(props: {fireId: string, content: ProblemInterface}) {

  const diffNames = ['- - -', 'EASY', 'MEDIUM', 'HARD'];
  const diffColor = ['white', 'darkgreen', 'darkyellow', 'red'];

  return (
    <div className={styles.RenderProblemContent} key={props.fireId}>

      <div className={styles.top}>
        <div className={styles.left}>
          <ProgressStatusButton 
            isBackButton={false}
            groupId={Number(props.content.group_id)}
            type_='problems'
            fireId={props.fireId}
            radiusCorners={ ['ALL5', 'NW'] }
          />
        </div>
        <div className={styles.right}>
          <Link 
              href={props.content.problem_url}
              target='_blank'
              rel='noopener noreferrer'
          >
            <Image src={linkSolid} alt={'link'} />
            <span className={styles.nameSpan}>
              { props.content.name }
            </span>
          </Link>
        </div>
      </div>

      <div className={styles.bottom}>
        <div className={styles.buttons}>

        </div>
        <div className={styles.diff}>
          <span className={styles.diffSpan}>{ diffNames[Number(props.content.difficulty)] }</span>
        </div>
      </div>

    </div>
  )
}

export default RenderProblemContent