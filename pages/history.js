import { useAtom } from 'jotai';
import { searchHistoryAtom } from '@/store';
import { useRouter } from 'next/router';
import styles from '@/styles/History.module.css';
import { Card, ListGroup, Button } from 'react-bootstrap';
import { removeFromHistory } from '@/lib/userData';

export default function History() {
  const [searchHistory, setSearchHistory] = useAtom(searchHistoryAtom);
  const router = useRouter();

  if (!searchHistory) return null;

  let parsedHistory = [];
  searchHistory.forEach((h) => {
    let params = new URLSearchParams(h);
    let entries = params.entries();
    parsedHistory.push(Object.fromEntries(entries));
  });

  const historyClicked = (e, index) => {
    e.preventDefault();
    router.push(`/artwork?${searchHistory[index]}`);
  };
  async function removeHistoryClicked(e, index) {
    e.stopPropagation();
    setSearchHistory(await removeFromHistory(searchHistory[index]));
  }

  return (
    <>
      {parsedHistory.length == 0 ? (
        <>
          <Card>
            <br />
            <h5>Nothing Here.</h5>
            <h5>Try adding some new artwork to the list.</h5>
            <br />
          </Card>
        </>
      ) : (
        <ListGroup>
          {parsedHistory.map((historyItem, index) => {
            return (
              <ListGroup.Item
                className={styles.historyListItem}
                key={index}
                onClick={(e) => historyClicked(e, index)}
              >
                {Object.keys(historyItem).map((key) => (
                  <>
                    {key}: <strong>{historyItem[key]}</strong>&nbsp;
                  </>
                ))}
                <Button
                  className="float-end"
                  variant="danger"
                  size="sm"
                  onClick={(e) => removeHistoryClicked(e, index)}
                >
                  &times;
                </Button>
              </ListGroup.Item>
            );
          })}
        </ListGroup>
      )}
    </>
  );
}
