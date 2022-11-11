export interface Page {
  page: number;
  limit: number;
  total?: number;
}

export interface QueryKey {
  $sort?: {
    [Key: string]: -1 | 1;
  };
  $limit?: number;
  $select?: string[];
  $in?: (string | number)[];
  $nin?: (string | number)[];
  $lt?: any;
  $lte?: any;
  $gt?: any;
  $gte?: any;
  $ne?: any;
  $or?: any;
}
