interface ProgressStatus {
  [fire_id: string]: number;
}

interface UserProgressStatusDataInterface {
  [group_id: string]: ProgressStatus;
}

export default UserProgressStatusDataInterface