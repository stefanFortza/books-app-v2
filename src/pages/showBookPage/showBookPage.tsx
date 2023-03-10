import { Paper, Box, Grid, styled, Typography } from "@mui/material";
import { FunctionComponent } from "react";
import { Container } from "react-bootstrap";
import { LoaderFunction, useLoaderData } from "react-router-dom";
import { BookAPI } from "../../api/BookAPI";
import { BookModel } from "../../api/models/book.model";
import SearchWiki from "../../api/searchWiki";
import ShowBookPageHeader from "../../components/bookComponents/bookPageData/showBookPageHeader.component";
import CommentForm from "../../components/commentComponents/commentForm/commentForm.component";
import CommentList from "../../components/commentComponents/commentList/commentList.component";

interface BookProps {}

export const showBookPageLoader: LoaderFunction = async ({ params }) => {
  const { bookId } = params;
  if (!bookId) {
    throw new Response("Book Not Found");
  }
  const book = await BookAPI.getBook(bookId);
  if (!book) throw new Response("Book Not Found");

  const description = await SearchWiki(book.title);
  if (description) book.description = description;

  console.log("yes");

  return book;
};

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(2),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

const ShowBookPage: FunctionComponent<BookProps> = () => {
  const currentBook = useLoaderData() as BookModel;

  return (
    <Container className="mb-5">
      <h1 className="text-center my-5">{currentBook?.title}</h1>

      <ShowBookPageHeader book={currentBook} />

      <Box sx={{ flexGrow: 1, mt: 5 }}>
        <Grid container spacing={2}>
          <Grid xs={8} item mb={3}>
            <Item sx={{ minHeight: "100%", fontSize: 18 }}>
              <Typography
                component="h3"
                variant="h3"
                mb={2}
                sx={{ textAlign: "left" }}
              >
                Description:
              </Typography>
              {currentBook.description || "No description"}
            </Item>
          </Grid>
          <Grid xs={4} item>
            <Item>{currentBook && <CommentForm book={currentBook} />}</Item>
          </Grid>
        </Grid>
      </Box>

      {currentBook && <CommentList currentBook={currentBook} />}
    </Container>
  );
};

export default ShowBookPage;
