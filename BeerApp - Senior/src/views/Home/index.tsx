import { useEffect, useState, memo, useCallback } from 'react';
import { fetchData, fetchFilterData} from './utils';
import { Beer } from '../../types';
import { Link as RouterLink } from 'react-router-dom';
import { Button, Checkbox, Paper, TextField, Link } from '@mui/material';
import styles from './Home.module.css';
import { database } from '../../service/database';
import { FavoriteBorder, Favorite } from '@mui/icons-material';

const ListItem = ({beer, onChange}: {beer: Beer, onChange: () => void}) => {
  const [checked, setChecked] = useState(() => !!database.getBeerById(beer.id))

  const onCheckFavourite = useCallback(() => {
    if (beer && !checked) {
      database.saveBeer(beer);
      setChecked(true);
      onChange();
    }

    if (beer && checked) {
      database.deleteBeerById(beer.id);
      setChecked(false);
      onChange();
    }
    return;
  }, [beer, checked, onChange]);

  return (
    <li >
      <Checkbox
        icon={<FavoriteBorder />}
        checkedIcon={<Favorite />}
        checked={checked}
        onChange={onCheckFavourite}
      />
      <Link component={RouterLink} to={`/beer/${beer.id}`}>
        {beer.name}
      </Link>
    </li>
  );
}

const Home = () => {
  const [beerList, setBeerList] = useState<Array<Beer>>([]);
  const [savedList, setSavedList] = useState<Array<Beer>>(() => database.getAllBeers());

  // eslint-disable-next-line
  useEffect(fetchData.bind(this, setBeerList), []);

  const refreshList = () => {
    fetchData(setBeerList);
  };

  const handleSearchBreweries = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    fetchFilterData(setBeerList, event.target.value);
  }, []);

  const handleToggleFavourite = useCallback(() => {
    setSavedList(database.getAllBeers());
  }, []);

  const removeAllItems = useCallback(() => {
    database.deleteAllBeers();
    setSavedList([]);
  }, []);

  return (
    <article>
      <section>
        <main>
          <Paper>
            <div className={styles.listContainer}>
              <div className={styles.listHeader}>
                <TextField label='Filter...' variant='outlined' onChange={handleSearchBreweries}/>
                <Button variant='contained' onClick={refreshList}>Reload list</Button>
              </div>
              <ul className={styles.list}>
                {beerList.map((beer, index) => {
                  return (
                    <ListItem beer={beer} onChange={handleToggleFavourite} key={index.toString()}/>
                  );
                })}
              </ul>
            </div>
          </Paper>

          <Paper>
            <div className={styles.listContainer}>
              <div className={styles.listHeader}>
                <h3>Saved items</h3>
                <Button variant='contained' size='small' onClick={removeAllItems}>
                  Remove all items
                </Button>
              </div>
              <ul className={styles.list}>
                {savedList.map((beer, index) => (
                  <ListItem beer={beer} onChange={handleToggleFavourite} key={index.toString()} />
                ))}
                {!savedList.length && <p>No saved items</p>}
              </ul>
            </div>
          </Paper>
        </main>
      </section>
    </article>
  );
};

export default memo(Home);
