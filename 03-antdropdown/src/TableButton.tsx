import { useState, useContext} from 'react';
import { Dropdown, Form, InputNumber, Button } from 'antd';
import { TableOutlined } from '@ant-design/icons';
import { isMarkdownTable } from './markdown-table';
import { AppContext } from './App';

interface TableButtonProps {
  onFormatSelectedTable: () => void; // Định nghĩa callback handleUpperCase
  onGenerateTable: (row: number, column: number) => void; // Định nghĩa callback handleAppendText
}

const TableButton = ({ onFormatSelectedTable, onGenerateTable }: TableButtonProps) => {
  const [formVisible, setFormVisible] = useState(false);
  const { selectedText } = useContext(AppContext);

  const handleBtnTableClick = () => {
    if (isMarkdownTable(selectedText)) {
      onFormatSelectedTable();
    } else {
      setFormVisible(true);
    }
  };


  const onFinish = (values: { row: number; column: number }) => {
    const { row, column } = values;
    onGenerateTable(row, column);
    setFormVisible(false); // Ẩn form sau khi submit
  };

  const popupForm = (
    <div style={{ 
      padding: '15px', 
      maxWidth: '300px', 
      margin: 'auto', 
      border: '1px solid #dddddd', 
      borderRadius: '4px', 
      backgroundColor: 'white', // Đặt nền màu trắng
      zIndex: 1000 // Đặt z-index để nổi lên phía trên các UI component khác
    }}>
      <Form
        name="example_form"
        onFinish={onFinish}
        layout="vertical"
        initialValues={{ column: 3, row: 3 }} // Sử dụng initialValues thay vì defaultValue
      >
        <Form.Item
          label="column:"
          name="column"
          rules={[{ required: true, message: 'Please input the column number!' }]}
          style={{ display: 'flex', alignItems: 'center' }} // Thêm style để đặt label và InputNumber trên 1 hàng
        >
          <InputNumber min={1} max={10} style={{ width: '100%' }} />
        </Form.Item>

        <Form.Item
          label="row:"
          name="row"
          rules={[{ required: true, message: 'Please input the row number!' }]}
        >
          <InputNumber min={1} max={10} style={{ width: '100%' }} />
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit" style={{ width: '100%' }}>
            Enter
          </Button>
        </Form.Item>
      </Form>
    </div>
  );

  return (
    <div style={{ padding: '20px' }}>
      <Dropdown 
        overlay={popupForm} 
        trigger={['click']}
        open={formVisible}
        onOpenChange={isMarkdownTable(selectedText) ? undefined : setFormVisible}
        >
          <Button icon={<TableOutlined />} type="text" onClick={handleBtnTableClick}/>
        </Dropdown>
    </div>
  );
};

export default TableButton;