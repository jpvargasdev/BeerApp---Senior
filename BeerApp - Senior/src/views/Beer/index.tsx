import { useCallback, useEffect, useState } from 'react';
import { Beer as IBeer } from '../../types';
import { fetchData } from './utils';
import { useParams } from 'react-router-dom';
import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet';

import { Paper, Typography, Checkbox, FormControlLabel } from '@mui/material';

import styles from './Beer.module.css';
import { Favorite, FavoriteBorder } from '@mui/icons-material';
import { database } from '../../service/database';

const Beer = () => {
  const { id } = useParams();
  const [beer, setBeer] = useState<IBeer>();
  const [checked, setChecked] = useState(() => !!database.getBeerById(id))

  // eslint-disable-next-line
  useEffect(fetchData.bind(this, setBeer, id), [id]);

  const onCheckFavourite = useCallback(() => {
    if (beer && !checked) {
      database.saveBeer(beer);
      setChecked(true);
    }

    if (beer && checked) {
      database.deleteBeerById(id);
      setChecked(false);
    }
    return;
  }, [beer, checked, id]);

  return (
    <article>
      <section>
        <header className={styles.header}>
          <Typography variant="h5" component="h1">
            {beer?.name}
          </Typography>
          <FormControlLabel
              control={
                <Checkbox
                  icon={<FavoriteBorder />}
                  checkedIcon={<Favorite />}
                  checked={checked}
                  onChange={onCheckFavourite}
                />
              } 
              label="Add as favourite"
            />
        </header>
        <main>
          <Paper elevation={2} className={styles.beerSpecsContainer}>
            
            <Typography variant="body1" component="p">
              <strong>Type:</strong> {beer?.brewery_type}
            </Typography>
            <Typography variant="body1" component="p">
              <strong>Country:</strong> {beer?.country}
            </Typography>
            <Typography variant="body1" component="p">
              <strong>City:</strong> {beer?.city}
            </Typography>

            <Typography variant="body1" component="p">
              <strong>Address:</strong> {beer?.address_1}
            </Typography>
            {beer?.website_url && (
              <Typography variant="body1" component="p">
                <strong>Web: </strong>
                <a
                  href={beer?.website_url}
                  rel='noreferrer'
                  target='_blank'>
                    {beer?.website_url}
                </a>
              </Typography>
            )}
            {beer?.phone && (
              <Typography variant="body1" component="p">
                <strong>Phone: </strong>
                <a href={`tel:${beer.phone}`}>{beer.phone}</a>
              </Typography>
            )}
          </Paper>
          {beer?.latitude && beer?.longitude && (
            <Paper elevation={2}>
              <MapContainer center={[Number(beer?.latitude), Number(beer?.longitude)]} zoom={15} scrollWheelZoom={false} className={styles.map}>
                <TileLayer
                  attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                <Marker position={[Number(beer?.latitude), Number(beer?.longitude)]}>
                  <Popup>
                    {beer?.name} <br />
                    {beer?.address_1} <br />
                    {beer?.website_url && (
                      <a
                        href={beer?.website_url}
                        rel='noreferrer'
                        target='_blank'>
                          {beer?.website_url}
                      </a>
                    )} <br />
                    {beer?.phone && (
                      <a href={`tel:${beer.phone}`}>{beer.phone}</a>
                    )}
                  </Popup>
                </Marker>
              </MapContainer>
            </Paper>
          )}
        </main>
      </section>
    </article>
  );
};

export default Beer;
