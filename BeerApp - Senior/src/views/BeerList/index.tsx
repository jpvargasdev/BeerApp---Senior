import { useEffect, useState } from 'react';
import { ApiParams, Beer, SORT, TYPE } from '../../types';
import { fetchData } from './utils';
import { Avatar, FormControl, InputLabel, List, ListItemAvatar, ListItemButton, ListItemText, MenuItem, Pagination, Select, Stack, TextField } from '@mui/material';
import SportsBar from '@mui/icons-material/SportsBar';
import { useNavigate } from 'react-router-dom';
import styles from './BeerList.module.css';

const typesOfBeer = [
  'ALL',
  'micro',
  'nano',
  'regional',
  'brewpub',
  'large',
  'planning',
  'bar',
  'contract',
  'proprietor',
  'closed',
];

const mItemsPerPage = [
  10,
  20,
  30,
];

const sortItems = [
  'asc',
  'desc'
]

const BeerList = () => {
  const navigate = useNavigate();
  const [beerList, setBeerList] = useState<Array<Beer>>([]);
  const [beerType, setBeerType] = useState(typesOfBeer[0]);
  const [itemsPerPage, setItemsPerPage] = useState<number | undefined>(mItemsPerPage[0])
  const [page, setPage] = useState(0);
  const [pages, setPages] = useState<number>(10);
  const [text, setText] = useState<string>();
  const [sort, setSort] = useState<string | number>(sortItems[0]);

  const onBeerClick = (id: string) => navigate(`/beer/${id}`);

  const handleChangePage = (event: any, value: number) => {
    setPage(value);
  };

  useEffect(() => {
    const params: ApiParams = {
      per_page: itemsPerPage,
      page,
      by_name: text,
    };
    if (beerType !== typesOfBeer[0]) {
      params.by_type = beerType as TYPE;
    }
    if (sort) {
      params.sort = `type,name:${sort}` as SORT
    }

    fetchData(
      setBeerList,
      setPages,
      params,
    )
  }, [beerType, itemsPerPage, page, sort, text]);

  return (
    <article>
      <section>
        <header className={styles.header}>
          <h1>BeerList page</h1>
          <Stack
            direction={{ xs: 'column', sm: 'row' }}
            spacing={{ xs: 1, sm: 2, md: 4 }}
          >
            <TextField
              label="Search"
              variant="outlined"
              value={text}
              onChange={(e) => setText(e.target.value)}
              fullWidth
            />
            <FormControl variant="outlined" fullWidth>
              <InputLabel>Type of Beer</InputLabel>
              <Select
                value={beerType}
                onChange={(e) => setBeerType(e.target.value)}
                label="Type of Beer">
                {typesOfBeer.map((type) => (
                  <MenuItem key={type} value={type}>{type}</MenuItem>
                ))}
              </Select>
            </FormControl>
            <FormControl variant="outlined" fullWidth>
              <InputLabel>Items per page</InputLabel>
              <Select
                value={itemsPerPage}
                onChange={(e) => setItemsPerPage(Number(e.target.value))}
                label="Items per page">
                {mItemsPerPage.map((type) => (
                  <MenuItem key={type} value={type}>{type}</MenuItem>
                ))}
              </Select>
            </FormControl>
            <FormControl variant="outlined" fullWidth>
              <InputLabel>Sort</InputLabel>
              <Select
                value={sort}
                onChange={(e) => setSort(e.target.value as SORT)}
                label="Sort">
                {sortItems.map((type) => (
                  <MenuItem key={type} value={type}>{type}</MenuItem>
                ))}
              </Select>
            </FormControl>
          </Stack>
        </header>
        <main>
          <Stack>
            <Pagination count={pages} page={page} onChange={handleChangePage} variant='outlined' shape='rounded'/>
            <List>
              {beerList.map((beer) => (
                <ListItemButton key={beer.id} onClick={onBeerClick.bind(this, beer.id)}>
                  <ListItemAvatar>
                    <Avatar>
                      <SportsBar />
                    </Avatar>
                  </ListItemAvatar>
                  <ListItemText primary={beer.name} secondary={beer.brewery_type} />
                </ListItemButton>
              ))}
            </List>
          </Stack>
        </main>
      </section>
    </article>
  );
};

export default BeerList;
