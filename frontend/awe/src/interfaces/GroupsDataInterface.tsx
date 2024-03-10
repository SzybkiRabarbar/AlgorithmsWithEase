interface GroupsDataInterface {
  articles: [ [number, number] ];  // [ group_id, article_id ]
  problems: [ [number, number] ];  // [ group_id, problem_id ]
  groups: [ {id: number, name: string} ];
}

export default GroupsDataInterface