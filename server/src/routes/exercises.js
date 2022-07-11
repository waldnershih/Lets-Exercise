const { Router } = require('express');
const {
	httpGetAllExercises,
	httpGetExerciseById,
	httpGetExercisesByBodyPart,
	httpGetExercisesByEquipment,
	httpGetExercisesByTarget,
	httpGetBodyPartList,
} = require('../controllers/exercises');

const router = Router();

router.route('/').get(httpGetAllExercises);
router.route('/exercise/:id').get(httpGetExerciseById);
router.route('/bodypart/:bodypart').get(httpGetExercisesByBodyPart);
router.route('/equipment/:equipment').get(httpGetExercisesByEquipment);
router.route('/target/:target').get(httpGetExercisesByTarget);
router.route('/bodyPartList').get(httpGetBodyPartList);

module.exports = router;
