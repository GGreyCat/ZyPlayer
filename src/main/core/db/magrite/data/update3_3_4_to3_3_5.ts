import logger from '../../../logger';
import db from '../../index';

const update3_3_4_to3_3_5 = () => {
  const db_res_analyze = db.get('tbl_analyze').value();
  let arr: any = [];
  if (db_res_analyze) {
    if (!Array.isArray(db_res_analyze)) {
      arr.push(db_res_analyze);
    } else arr = db_res_analyze;
    const res = arr.map((obj) => ({ ...obj, type: obj?.type ? obj.type : 0 }));
    logger.info(res);
    db.set('tbl_analyze', res).write();
  }

  if (db.get('tbl_setting').find({ key: 'timeout' }).value()?.value) {
    db.get('tbl_setting').remove({ key: 'timeout' }).write();
  }
  db.get('tbl_setting').insert({ key: 'timeout', value: 5000 }).write();

  if (db.get('tbl_setting').find({ key: 'ai' }).value()?.value) {
    db.get('tbl_setting').remove({ key: 'ai' }).write();
  }
  db.get('tbl_setting')
    .insert({
      key: 'ai',
      value: {
        server: '',
        key: '',
        model: '',
      },
    })
    .write();

  db.get('tbl_setting').find({ key: 'version' }).assign({ key: 'version', value: '3.3.5' }).write();

  logger.info('[db][magrite][update3_3_4_to3_3_5]completed');
};

export default update3_3_4_to3_3_5;
