import useSWR from 'swr';
import Error from 'next/error';
import Card from 'react-bootstrap/Card';
import { useAtom } from 'jotai';
import { favouritesAtom } from '@/store';
import { useState } from 'react';

export default function ArtworkCardDetail(props) {
  const [faviouritesList, setFavouritesList] = useAtom(favouritesAtom);

  const [showAdded, setShowAdded] = useState(
    faviouritesList.includes(props.objectID) ? true : false
  );

  const { data, error } = useSWR(
    props.objectID
      ? `https://collectionapi.metmuseum.org/public/collection/v1/objects/${props.objectID}`
      : null
  );
  if (error) {
    return <Error statusCode={404} />;
  }

  const favouritesClicked = () => {
    if (showAdded) {
      setFavouritesList((current) =>
        current.filter((fav) => fav != props.objectID)
      );
      setShowAdded(false);
    } else {
      setFavouritesList((current) => [...current, props.objectID]);
      setShowAdded(true);
    }
  };

  return data ? (
    <Card>
      {data.primaryImage ? (
        <Card.Img variant="top" src={data.primaryImage} />
      ) : (
        <></>
      )}

      <Card.Body>
        <Card.Title>{data.title ? data.title : 'N/A'}</Card.Title>
        <Card.Text>
          <div>Date: {data.objectDate ? data.objectDate : 'N/A'}</div>
          <div>
            Classification: {data.classification ? data.classification : 'N/A'}
          </div>
          <div>Medium: {data.medium ? data.medium : 'N/A'}</div>
          <br />
          <br />
          <div>
            Artist: {data.artistDisplayName ? data.artistDisplayName : 'N/A'}
            {data.artistDisplayName && (
              <span>
                {' '}
                (
                <a
                  href={data.artistWikidata_URL}
                  target="_blank"
                  rel="noreferrer"
                >
                  wiki
                </a>
                )
              </span>
            )}
          </div>
          <div>Credit Line: {data.creditLine ? data.creditLine : 'N/A'}</div>
          <div>Dimensions: {data.dimensions ? data.dimensions : 'N/A'}</div>
          <br />
          <button
            type="button"
            className="btn btn-success"
            variant={showAdded ? 'primary' : 'outline-primary'}
            onClick={favouritesClicked}
          >
            {showAdded ? '+ Favourite(added)' : '+ Favourite'}
          </button>
        </Card.Text>
      </Card.Body>
    </Card>
  ) : null;
}
