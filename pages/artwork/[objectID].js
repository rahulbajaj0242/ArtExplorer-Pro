import { Row, Col } from 'react-bootstrap';
import { useRouter } from 'next/router';
import ArtworkCardDetail from '@/components/ArtworkCardDetail';
import Error from 'next/error';

export default function ArtworkById() {
  const router = useRouter();
  const { objectID } = router.query;
  return objectID ? (
    <>
      <Row>
        <Col>
          <ArtworkCardDetail objectID={objectID} />
        </Col>
      </Row>
    </>
  ) : (
    <Error statusCode={404} />
  );
}
