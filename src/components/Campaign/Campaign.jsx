import { useState, useEffect } from "react";
import { Table, Button, Popconfirm, Modal, notification, Badge, Input, Select, DatePicker } from "antd";
import { deleteCampaign, getCampaigns } from "../../api";
import { useNavigate } from "react-router-dom";
import CampaignForm from "./CampaignForm";
import { useAuth } from "../../context/AuthContext";
import dayjs from "dayjs"; // Import dayjs for date formatting

const { Option } = Select;

const Campaigns = () => {
  const [campaigns, setCampaigns] = useState([]);
  const [filteredCampaigns, setFilteredCampaigns] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editingCampaign, setEditingCampaign] = useState(null);
  const [searchText, setSearchText] = useState('');
  const [filters, setFilters] = useState({
    date: null,
    campaignType: null,
    preparedBy: null,
    status: null,
  });
  const { logout, user } = useAuth();
  const navigate = useNavigate();

  const fetchCampaigns = async () => {
    try {
      const response = await getCampaigns();
      setCampaigns(response.data);
      setFilteredCampaigns(response.data); // Initialize filtered campaigns
    } catch (error) {
      notification.error({
        message: "Campaigns fetching Failed",
        description: error.response?.data?.message || error.message,
      });
    }
  };

  useEffect(() => {
    fetchCampaigns();
  }, [user]);

  useEffect(() => {
    // Filter campaigns based on the searchText and filters
    let filtered = campaigns.filter((campaign) => {
      const matchesSearchText = (
        campaign.date.toLowerCase().includes(searchText.toLowerCase()) ||
        campaign.campaignType.toLowerCase().includes(searchText.toLowerCase()) ||
        campaign.campaignCode.toLowerCase().includes(searchText.toLowerCase()) ||
        campaign.landingPages.toString().includes(searchText.toLowerCase()) ||
        campaign.preparedBy.toLowerCase().includes(searchText.toLowerCase()) ||
        campaign.status.toLowerCase().includes(searchText.toLowerCase())
      );

      const matchesFilters = (
        (!filters.date || dayjs(campaign.date).isSame(dayjs(filters.date), 'day')) &&
        (!filters.campaignType || campaign.campaignType === filters.campaignType) &&
        (!filters.preparedBy || campaign.preparedBy === filters.preparedBy) &&
        (!filters.status || campaign.status === filters.status)
      );

      return matchesSearchText && matchesFilters;
    });
    setFilteredCampaigns(filtered);
  }, [searchText, filters, campaigns]);

  const handleDelete = async (id) => {
    try {
      await deleteCampaign(id);
      setCampaigns(campaigns.filter((campaign) => campaign._id !== id));
    } catch (error) {
      console.error("Failed to delete campaign", error);
    }
  };

  const handleAddCampaign = () => {
    setEditingCampaign(null);
    setIsModalVisible(true);
  };

  const handleEditCampaign = (campaign) => {
    setEditingCampaign(campaign);
    setIsModalVisible(true);
  };

  const handleModalOk = () => {
    setIsModalVisible(false);
  };

  const handleModalCancel = () => {
    setIsModalVisible(false);
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "Not yet started":
        return "red";
      case "In progress":
        return "yellow";
      case "Completed":
        return "green";
      default:
        return "default";
    }
  };

  const statusPriority = {
    "Not yet started": 1,
    "In progress": 2,
    Completed: 3,
  };

  const sortByStatus = (a, b) => {
    return statusPriority[a.status] - statusPriority[b.status];
  };

  const columns = [
    {
      title: "Date",
      dataIndex: "date",
      key: "date",
      render: (text) => dayjs(text).format("DD-MM-YYYY"),
      sorter: (a, b) => (dayjs(a.date).isAfter(dayjs(b.date)) ? 1 : -1),
      filterDropdown: () => (
        <div style={{ padding: 8 }}>
          <DatePicker
            style={{ width: 188, marginBottom: 8 }}
            onChange={(date) => setFilters({ ...filters, date: date ? date.format('YYYY-MM-DD') : null })}
          />
        </div>
      ),
      filterIcon: () => <span>📅</span>,
    },
    {
      title: "Campaign",
      dataIndex: "campaignType",
      key: "campaignType",
      sorter: (a, b) => a.campaignType.localeCompare(b.campaignType),
      filters: [
        { text: "CL", value: "CL" },
        { text: "TT", value: "TT" },
        { text: "GG", value: "GG" },
        { text: "FS", value: "FS" },
        { text: "IT", value: "IT" },
        { text: "CR", value: "CR" },
        { text: "DA", value: "DA" },
        { text: "JM", value: "JM" },
      ],
      onFilter: (value, record) => record.campaignType === value,
    },
    {
      title: "Code",
      dataIndex: "campaignCode",
      key: "campaignCode",
      sorter: (a, b) => a.campaignCode.localeCompare(b.campaignCode),
    },
    {
      title: "Landing Pages",
      dataIndex: "landingPages",
      key: "landingPages",
      sorter: (a, b) => a.landingPages - b.landingPages,
    },
    {
      title: "Prepared By",
      dataIndex: "preparedBy",
      key: "preparedBy",
      sorter: (a, b) => a.preparedBy.localeCompare(b.preparedBy),
      filters: [
        { text: "Atul Tingre", value: "Atul Tingre" },
        { text: "Nandkishor Kadam", value: "Nandkishor Kadam" },
        { text: "Avinash Mahajan", value: "Avinash Mahajan" },
      ],
      onFilter: (value, record) => record.preparedBy === value,
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (status) => (
        <Badge color={getStatusColor(status)} text={status} />
      ),
      sorter: (a, b) => statusPriority[a.status] - statusPriority[b.status],
      filters: [
        { text: "Not yet started", value: "Not yet started" },
        { text: "In progress", value: "In progress" },
        { text: "Completed", value: "Completed" },
      ],
      onFilter: (value, record) => record.status === value,
    },
    ...(user
      ? [
          {
            title: "Actions",
            key: "actions",
            render: (_, record) => (
              <>
                <Button type="link" onClick={() => handleEditCampaign(record)}>
                  Edit
                </Button>
                <Popconfirm
                  title="Are you sure to delete this campaign?"
                  onConfirm={() => handleDelete(record._id)}
                >
                  <Button type="link">Delete</Button>
                </Popconfirm>
              </>
            ),
          },
        ]
      : []),
  ];

  const rowClassName = (record) => {
    switch (record.status) {
      case "Not yet started":
        return "bg-red-100";
      case "In progress":
        return "bg-yellow-100";
      case "Completed":
        return "bg-green-100";
      default:
        return "";
    }
  };

  return (
    <div>
      <div className="flex flex-col justify-between items-center mb-5">
        <div className="text-end w-full">
          {!user ? (
            <Button type="primary" onClick={() => navigate("/login")}>
              Login
            </Button>
          ) : (
            <Button type="primary" onClick={() => logout()}>
              Logout
            </Button>
          )}
        </div>
        <div className="flex justify-between items-center w-full mt-4">
          <h1 className="text-2xl font-semibold">Campaigns</h1>
          {user && (
            <Button type="primary" onClick={handleAddCampaign}>
              Add Campaign
            </Button>
          )}
        </div>
        <div className="w-full mt-4">
          <Input
            placeholder="Search campaigns..."
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            style={{ marginBottom: 16 }}
          />
        </div>
      </div>
      <Table
        columns={columns}
        dataSource={filteredCampaigns.sort(sortByStatus)}
        scroll={{ x: 1000 }}
        rowKey="_id"
        rowClassName={rowClassName}
      />
      <Modal
        open={isModalVisible}
        onOk={handleModalOk}
        onCancel={handleModalCancel}
        footer={null}
      >
        <CampaignForm
          setCampaigns={setCampaigns}
          onSuccess={handleModalOk}
          initialValues={editingCampaign}
        />
      </Modal>
    </div>
  );
};

export default Campaigns;
