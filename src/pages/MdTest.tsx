import ReactMarkdown from 'react-markdown';
import { useEffect, useState } from 'react';
import rehypeRaw from 'rehype-raw';
import Pagination from 'react-bootstrap/esm/Pagination';
import Stack from 'react-bootstrap/esm/Stack';

const urlFile = 'http://localhost:3001/file/';
const urlSlides = 'http://localhost:3001/slides/';

const MdTest = () => {
  const [markdownContent, setMarkdownContent] = useState("");
  const [slideFileName, setSlideFileName] = useState("");
  const [activeItem, setActiveItem] = useState(1);
  const [totalItems, setTotalItems] = useState(0);

  const setPaginationControlls = (activeItem: number, totalItems: number) => {
    let items = [];
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
      <Pagination size="sm">{setPaginationControlls(activeItem, totalItems)}</Pagination>
      <div>
        <ReactMarkdown children={markdownContent} rehypePlugins={[rehypeRaw]} />
      </div>
    </Stack>

  );
};

export default MdTest;