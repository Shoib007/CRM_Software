import { Button, Form, Input, Modal, Select } from "antd";
import { useContext, useEffect, useState } from "react";
import { ModalContext } from "../context/modal_context";
import { useSheet } from "../hooks/fetch_sheet";
import { useParams } from "react-router-dom";

export default function TrainingModifyModal({ sheetData, setSchool, subject }) {
    // const location = useLocation();
    const { id } = useParams();
    const { trainingSheetModifyState, setTrainingSheetModifyState } = useContext(ModalContext);
    const [trainingData, setTrainingData] = useState();
    const { patchSheetDataMutate, postSchoolSheetMutate } = useSheet( { id: id, subject: subject });
    console.log(sheetData);

    const handleUpdate = async (val) => {
        if (sheetData.id) {
            patchSheetDataMutate({ data: val, id: sheetData.id });
            setSchool({ data: {}, id: "" });
            setTrainingSheetModifyState(false);
        } else {
            postSchoolSheetMutate(val, subject);
            setTrainingSheetModifyState(false);
        }
    }

    const handleCancel = () => {
        setTrainingSheetModifyState(false);
        setSchool({ data: {}, id: "" });
    }

    useEffect(() => {
        if (sheetData) {
            setTrainingData(sheetData);
        }
    }, [sheetData])

    return (
        <Modal open={trainingSheetModifyState} title="Edit Sheet Data" onCancel={() => handleCancel()} centered
            footer={[]}
        >
            <Form
                layout="vertical" name="basic"
                className="flex gap-4"
                fields={[
                    {
                        name: ["grade"],
                        value: trainingData?.data?.grade ? trainingData?.data?.grade : "Grade 1"
                    },
                    {
                        name: ["topic"],
                        value: trainingData?.data?.topic
                    },
                    {
                        name: ["date"],
                        value: trainingData?.data?.date ? trainingData?.data?.date : new Date().toISOString().split('T')[0]
                    },
                    {
                        name: ["duration"],
                        value: trainingData?.data?.duration ? trainingData?.data?.duration : "1.5 hours"
                    },
                    {
                        name: ["conducted"],
                        value: trainingData?.data?.conducted ? trainingData?.data?.conducted : "Conducted"
                    },
                    {
                        name: ["trainerRemark"],
                        value: trainingData?.data?.trainerRemark
                    },
                    {
                        name: ["teachers"],
                        value: trainingData?.data?.teachers ? trainingData?.data?.teachers : []
                    }
                ]}

                onFinish={handleUpdate}
            >
                <div className="flex-1">
                    <Form.Item label="Grade" name="grade">
                        <Input value={trainingData?.data?.grade} />
                    </Form.Item>

                    <Form.Item label="Topic" name="topic">
                        <Input value={trainingData?.data?.topic} />
                    </Form.Item>

                    <Form.Item label="Date" name="date">
                        <Input value={trainingData?.data?.date ? trainingData?.data?.date : new Date().toISOString().split('T')[0]} />
                    </Form.Item>

                    <Form.Item label="Teachers" name="teachers">
                        <Select mode="multiple" placeholder="Select Teachers"/>
                    </Form.Item>

                </div>

                <div className="flex-1">
                    <Form.Item label="Duration" name="duration">
                        <Input value={trainingData?.data?.duration} />
                    </Form.Item>

                    <Form.Item label="Conducted" name="conducted">
                        <Input value={trainingData?.data?.conducted} />
                    </Form.Item>

                    <Form.Item label="Trainer Remark" name="trainerRemark">
                        <Input.TextArea value={trainingData?.data?.trainerRemark} />
                    </Form.Item>

                    <div className="flex gap-4">
                        <Form.Item>
                            {trainingData?.id ? <Button htmlType="submit" danger >Update</Button> : <Button htmlType="submit" danger >ADD</Button>}
                        </Form.Item>

                        <Form.Item>
                            <Button onClick={() => handleCancel()}>Cancle</Button>
                        </Form.Item>
                    </div>
                </div>
            </Form>
        </Modal>
    )
}


// export function TrainingAddModal() {
//     const { trainingSheetAddState, setTrainingSheetAddState } = useContext(ModalContext);
//     // console.log(school);
//     return (
//         <Modal open={trainingSheetAddState} onCancel={() => setTrainingSheetAddState(false)} centered width={"90%"}
//             footer={[
//                 <Button key="back" onClick={() => setTrainingSheetAddState(false)}> Cancle </Button>,
//                 <Button key="submit" type="danger">Submit</Button>
//             ]}
//         >

//         </Modal>
//     )
// }
