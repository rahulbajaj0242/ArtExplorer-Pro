import { useAtom } from 'jotai';
import { favouritesAtom } from '@/store';
import Card from 'react-bootstrap/Card';
import { Row, Col } from 'react-bootstrap';
import ArtworkCard from '@/components/ArtworkCard';

export default function Favourites() {
  const [faviouritesList, setFavouritesList] = useAtom(favouritesAtom);

  return (
    <>
      <Row className="gy-4">
        {faviouritesList.length > 0 ? (
          faviouritesList.map((item) => (
            <Col lg={3} key={item}>
              <ArtworkCard objectID={item} />
            </Col>
          ))
        ) : (
          <>
            <Card>
              <br />
              <h5>Nothing Here.</h5>
              <h5>Try adding some new artwork to the list.</h5>
              <br />
            </Card>
          </>
        )}
      </Row>
    </>
  );
}
