interface GroupsDataInterface {
  articles: [ [number, string] ];  // [ group_id, article_id ]
  problems: [ [number, string] ];  // [ group_id, problem_id ]
  groups: [ {id: number, name: string} ];
}

export default GroupsDataInterface