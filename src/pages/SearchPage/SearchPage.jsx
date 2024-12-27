import React, { useState, useRef, useEffect } from "react";
import {
  InstantSearch,
  SearchBox,
  Hits,
  Highlight,
  Pagination,
} from "react-instantsearch";
import { algoliasearch } from "algoliasearch";
import "./SearchPage.css";
import Navbar from "../../components/Navbar/Navbar";
import colorSharp from "../../assets/color-sharp.png";
import colorSharp2 from "../../assets/color-sharp2.png";

import { db } from "../../components/Firebase/firebase"; // Import db Firestore
import { doc, setDoc, collection } from "firebase/firestore";
import { auth } from "../../components/Firebase/firebase"; // Import auth Firestore
import { toast } from "react-toastify"; // Import thư viện thông báo

// Hàm lưu bộ truyện vào Firestore
const saveFollowedStory = async (storyData) => {
  try {
    const userId = auth.currentUser.uid; // Lấy UID của người dùng
    const followedStoriesRef = collection(
      db,
      "users",
      userId,
      "followed_stories"
    ); // Định nghĩa subcollection

    // Lưu thông tin bộ truyện vào Firestore
    const docRef = doc(followedStoriesRef, storyData.story_name); // Dùng tên bộ truyện làm ID
    await setDoc(docRef, storyData);

    toast.success("Đã theo dõi bộ truyện!", { position: "top-center" });
  } catch (error) {
    console.error("Error following story: ", error);
    toast.error("Có lỗi khi theo dõi bộ truyện!", {
      position: "bottom-center",
    });
  }
};

const searchClient = algoliasearch(
  "XYSYH4I2T6",
  "512d0d5c98c023906c54058c380aa369"
);

const Hit = ({ hit }) => {
  const [isExpanded, setIsExpanded] = useState(false); // Trạng thái mở rộng
  const [isOverflowing, setIsOverflowing] = useState(false); // Kiểm tra xem văn bản có bị overflow không
  const descriptionRef = useRef(null); // Dùng ref để tham chiếu tới phần tử mô tả

  // Kiểm tra nếu mô tả có bị overflow hay không
  useEffect(() => {
    if (descriptionRef.current) {
      setIsOverflowing(
        descriptionRef.current.scrollHeight >
          descriptionRef.current.clientHeight
      );
    }
  }, [hit.description]);

  const handleToggle = () => {
    setIsExpanded(!isExpanded); // Toggle trạng thái mở rộng
  };

  const handleFollowClick = () => {
    saveFollowedStory(hit); // Lưu bộ truyện khi nhấn "Theo dõi"
  };

  return (
    <div className="hit-item">
      <img src={hit.image} alt={hit.story_name} />
      <div className="hit-item-content">
        <div className="hit-item-name">
          <h3>
            <Highlight attribute="story_name" hit={hit} />
          </h3>
          {/* Nút theo dõi */}
          <button onClick={handleFollowClick} className="follow-button">
            ❤️ Theo dõi ngay
          </button>
        </div>

        <div>
          <p
            className={`description ${isExpanded ? "expanded" : ""}`}
            ref={descriptionRef}
          >
            <Highlight attribute="description" hit={hit} />
          </p>
          {isOverflowing && (
            <button className="read-more-button" onClick={handleToggle}>
              {isExpanded ? "Ẩn bớt" : "Xem thêm"}
            </button>
          )}
        </div>

        <p className="author">
          Tác giả:{" "}
          {hit.author
            ? hit.author
            : hit.author_name
            ? hit.author_name
            : "Không có"}
        </p>
        <p className="artist">
          Minh họa:{" "}
          {hit.artist
            ? hit.artist
            : hit.artist_name
            ? hit.artist_name
            : "Không có"}
        </p>
        <p className="genres">
          Thể loại: <Highlight attribute="genres" hit={hit} />
        </p>
        <p className="chapters_count">
          Số tập: {hit.chapters_count} {hit.chapter_count}
        </p>
        <p className="status">Tình trạng: {hit.status}</p>
      </div>
    </div>
  );
};

function SearchPage() {
  return (
    <>
      <Navbar />

      <img className="bg-image-left" src={colorSharp} alt="Image" />
      <img className="bg-image-right" src={colorSharp2} alt="Image" />

      <div className="search-page">
        <h1 className="search-title">Tìm kiếm Truyện & Tiểu thuyết</h1>
        <InstantSearch
          indexName="normalized_stories"
          searchClient={searchClient}
        >
          <SearchBox
            translations={{ placeholder: "Tên truyện, thể loại, tác giả..." }}
          />
          <div className="hits-container">
            <Hits hitComponent={Hit} />
          </div>
          <Pagination />
        </InstantSearch>
      </div>
    </>
  );
}

export default SearchPage;
