interface ProgressStatus {
  [fire_id: string]: number;
}


interface ProgressType {
  [type_: string]: ProgressStatus
}


interface UserProgressStatusDataInterface {
  [group_id: string]: ProgressType;
}

export default UserProgressStatusDataInterface