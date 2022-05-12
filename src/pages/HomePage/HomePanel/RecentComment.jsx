import { message } from "antd";
import React from "react";
import axiosClient from "../../../api/axiosClient";
import { ReviewCarousel } from "../components/HomeCarousel/ReviewCarousel";
export function RecentComment() {

  const [commentList, setCommentList] = React.useState([]);
  const fetchData = async () => {
    try {
      let result = await axiosClient.get('/reviews');
      console.log(result);
      if (result) {
        setCommentList(result);
      }
    } catch (error) {
      message.error("Đã xảy ra lỗi, vui lòng thử lại sau");
    }
  }

  React.useEffect(() => {
    fetchData();
  }, [])

  return (
    <div className='rounded-xl p-2' style={{ width: '100%', height: "300px", backgroundColor: '#FFFFFF' }}>
      <div className="flex justify-between mt-2">
        <h2 className="text-2xl font-medium pl-4">Bình luận mới nhất</h2>
      </div>
      <div className='m-auto px-5'>
        {commentList.length > 0 && <ReviewCarousel commentList={commentList} />}
      </div>
    </div>
  );
}