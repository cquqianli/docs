TurtleFrame::TurtleFrame(rclcpp::Node::SharedPtr& node_handle, QWidget* parent, Qt::WindowFlags f)
: QFrame(parent, f)
, path_image_(500, 500, QImage::Format_ARGB32)
, path_painter_(&path_image_)
, frame_count_(0)
, id_counter_(0)
{
// omitted
}

TurtleFrame::~TurtleFrame()
{
  delete update_timer_;
}

TurtlePtr t = std::make_shared<Turtle>(nh_, real_name, turtle_images_[static_cast<int>(index)], QPointF(x, height_in_meters_ - y), angle);
