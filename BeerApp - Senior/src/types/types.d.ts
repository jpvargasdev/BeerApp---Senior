type TYPE =
  | 'micro'
  | 'nano'
  | 'regional'
  | 'brewpub'
  | 'large'
  | 'planning'
  | 'bar'
  | 'contract'
  | 'proprietor'
  | 'closed';

type SORT = 'type,name:ascasc' | 'type,name:ascdesc';

export type { TYPE, SORT };
