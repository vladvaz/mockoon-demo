import ReactMarkdown from 'react-markdown';
import { useEffect, useState } from 'react';
import rehypeRaw from 'rehype-raw';
import Pagination from 'react-bootstrap/esm/Pagination';
import Stack from 'react-bootstrap/esm/Stack';

const urlFile = 'http://localhost:3001/file/';
const urlSlides = 'http://localhost:3001/slides/';

const SlideShow = () => {
  const [markdownContent, setMarkdownContent] = useState("");
  const [slideFileName, setSlideFileName] = useState("");
  const [activeItem, setActiveItem] = useState(1);
  const [totalItems, setTotalItems] = useState(0);


  function onPreviousEvent(): void {
    if (activeItem > 1) {
      setActiveItem(activeItem - 1);
    }
  }

  function onNextEvent(): void {
    if (activeItem < totalItems) {
      setActiveItem(activeItem + 1);
    }
  }

  const setPaginationControlls = (activeItem: number, totalItems: number) => {
    const items = [];
    items.push(<Pagination.Prev key={0} onClick={onPreviousEvent} />);
    for (let number = 1; number <= totalItems; number++) {
      items.push(
        <Pagination.Item
          key={number}
          active={number === activeItem}
          onClick={() => setActiveItem(number)}>
          {number}
        </Pagination.Item>,
      );
    }
    items.push(<Pagination.Next key={totalItems + 1} onClick={onNextEvent} />);
    return items;
  };

  useEffect(() => {
    fetch(`${urlSlides}?&page=${activeItem}&limit=1`)
      .then(response => {
        const total = response.headers.get('X-Total-Count');
        if (total) {
          setTotalItems(Number.parseInt(total));
        }

        return response.json();
      })
      .then(json => setSlideFileName(json[0]['id']));
  }, [activeItem]);

  useEffect(() => {
    fetch(`${urlFile}${slideFileName}`)
      .then(response => response.text())
      .then(markdownText => setMarkdownContent(markdownText));
  }, [slideFileName]);

  return (
    <Stack gap={3} className="mt-3 mx-auto">
      <Pagination size="sm" data-testid="pagination-controls">{setPaginationControlls(activeItem, totalItems)}</Pagination>
      <div>
        <ReactMarkdown children={markdownContent} rehypePlugins={[rehypeRaw]} />
      </div>
    </Stack>

  );
};

export default SlideShow;
