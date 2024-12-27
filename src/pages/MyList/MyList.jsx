import React, { useEffect, useState } from "react";
import Navbar from "../../components/Navbar/Navbar";
import { auth, db } from "../../components/Firebase/firebase"; // Import db Firestore
import { collection, getDocs } from "firebase/firestore";
import "./MyList.css";

// Component hiển thị chi tiết bộ truyện khi nhấp vào
const StoryDetail = ({ story, onClose }) => (
  <div className="story-detail-modal">
    <button className="close-button" onClick={onClose}>
      X
    </button>
    <h3>{story.story_name}</h3>
    <img src={story.image} alt={story.story_name} />
    <p>{story.description}</p>
    <p>
      <strong>Tác giả:</strong> {story.author || "Không có"}
    </p>
    <p>
      <strong>Minh họa:</strong> {story.artist || "Không có"}
    </p>
    <p>
      <strong>Thể loại:</strong> {story.genres.join(", ")}
    </p>
    <p>
      <strong>Tình trạng:</strong> {story.status}
    </p>
    <p>
      <strong>Số tập:</strong> {story.chapters_count}
    </p>
    {/* Thêm trường URL */}
    <p>
      <strong>URL:</strong>
      <a
        href={story.url}
        className="url"
        target="_blank"
        rel="noopener noreferrer"
      >
        {story.url}
      </a>
    </p>
  </div>
);


const MyList = () => {
  const [followedStories, setFollowedStories] = useState([]);
  const [selectedStory, setSelectedStory] = useState(null);

  // Lấy danh sách bộ truyện đã theo dõi từ Firestore
  useEffect(() => {
    const fetchFollowedStories = async () => {
      const userId = auth.currentUser.uid; // Thay thế bằng UID của người dùng hiện tại
      console.log("User ID:", userId); // In ra UID để kiểm tra
      const followedStoriesRef = collection(
        db,
        "users",
        userId,
        "followed_stories"
      );
      try {
        const snapshot = await getDocs(followedStoriesRef);
        const storiesList = snapshot.docs.map((doc) => doc.data());
        console.log("Followed Stories:", storiesList); // In ra dữ liệu truyện để kiểm tra
        setFollowedStories(storiesList);
      } catch (error) {
        console.error("Error fetching followed stories:", error);
      }
    };

    fetchFollowedStories();
  }, []);

  // Hàm xử lý khi người dùng nhấn vào bộ truyện
  const handleStoryClick = (story) => {
    setSelectedStory(story); // Mở chi tiết khi người dùng nhấn vào bộ truyện
  };

  // Hàm đóng chi tiết bộ truyện khi người dùng nhấn "X"
  const handleCloseDetail = () => {
    setSelectedStory(null); // Đóng chi tiết khi người dùng nhấn "X"
  };

  return (
    <div>
      <Navbar />
      <div className="DS-manga">
        <h2>Danh sách truyện tranh của tôi</h2>
        <div className="story-grid">
          {followedStories.length > 0 ? (
            followedStories.map((story) => (
              <div
                key={story.story_name}
                className="story-item"
                onClick={() => handleStoryClick(story)}
              >
                <img src={story.image} alt={story.story_name} />
                <h4>{story.story_name}</h4>
              </div>
            ))
          ) : (
            <p>Chưa theo dõi bộ truyện nào.</p>
          )}
        </div>
      </div>

      {/* Nếu có bộ truyện được chọn, hiển thị chi tiết */}
      {selectedStory && (
        <StoryDetail story={selectedStory} onClose={handleCloseDetail} />
      )}
    </div>
  );
};

export default MyList;
