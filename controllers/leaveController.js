import Leave from "../models/Leave.js";
import Employee from "../models/Employee.js"; 
import path from "path";

export const addLeave = async (req, res) => {
  try {
    const { userId, leaveType, startDate, endDate, reason } = req.body;
    const employee = await Employee.findOne({userId});

    const newLeave = new Leave({
      employeeId: employee._id,
      leaveType,
      startDate,
      endDate,
      reason
    });

    await newLeave.save();

    return res.status(200).json({ success: true });
  } catch (error) {
    return res.status(500).json({ success: false, error: "Leave add server error" });
  }
};

// export const getLeave = async (req, res) => {
//   try {
//     const { id } = req.params;
//     let employee = await Employee.findById(id);

//     if (!employee) {
//       employee = await Employee.findOne({ userId: id });
//     }

//     if (!employee) {
//       return res.status(404).json({ success: false, error: "Employee not found" });
//     }

//     const leaves = await Leave.find({ employeeId: employee._id }).sort({ startDate: -1 });

//     return res.status(200).json({ success: true, leaves });
//   } catch (error) {
//     console.log(error.message);
//     return res.status(500).json({ success: false, error: "Leave fetch server error" });
//   }
// };

export const getLeave = async (req, res) => {
  try {
    const { id } = req.params;
    let leaves = await Leave.find({ employeeId:id });

    if(!leaves || leaves.length === 0){
      const employee = await Employee.findOne({userId: id})
      leaves = await Leave.find({employeeId: employee._id})
    }

    return res.status(200).json({ success: true, leaves });
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({ success: false, error: "Leave fetch server error" });
  }
};

export const getLeaves = async (req, res) => {
   try {
    const leaves = await Leave.find().populate({
      path: "employeeId",
      populate: [
        {
          path: 'department',
          select: 'dep_name'
        },
        {
          path: 'userId',
          select: 'name'
        }
      ]
    });
    
    return res.status(200).json({ success: true, leaves });
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({ success: false, error: "Leave add server error" });
  }
}

export const getLeaveDetail = async (req, res) => {
  try {
    const { id } = req.params;
    const leave = await Leave.findById({_id: id}).populate({
      path: "employeeId",
      populate: [
        {
          path: 'department',
          select: 'dep_name'
        },
        {
          path: 'userId',
          select: 'name, profileImage'
        }
      ]
    });
    
    return res.status(200).json({ success: true, leave });
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({ success: false, error: "Leave fetch server error" });
  }
}

export const updateLeave = async (req, res) => {
  try {
    const {id} = req.params;
    const leave = await Leave.findByIdAndUpdate({_id:id}, {status: req.body.status});
    if(!leave){
      return res.status(404).json({success: false, error: "Leave not found"});
    }
    return res.status(200).json({success: true});
  } catch (error) {
     console.log(error.message);
    return res.status(500).json({ success: false, error: "Leave update server error" });
  }
}
