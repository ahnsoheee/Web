import { SchemaDirectiveVisitor } from 'apollo-server-express';
import { defaultFieldResolver } from 'graphql';
import jwt from 'jsonwebtoken';
import Config from '../../config';

class AuthDirective extends SchemaDirectiveVisitor {
  visitFieldDefinition(field) {
    const requiredRole = this.args.requires;
    const { resolve = defaultFieldResolver } = field;
    // resolve: isAuthorizedUser

    field.resolve = async (...args) => {
      try {
        const { req, res, dataSources } = args[2]; // context
        const [token, type] = [req.signedCookies.userToken, 'User'];
        if (!token) throw new Error('Unauthorized access'); // 인증 실패 시 처리 -> catch (err)

        const decoded = jwt.verify(token, Config.JWT_SECRET);
        const model = dataSources.model(type);
        const result = await model.findOne({ _id: decoded.id });
        if (result) return resolve.apply(this, args);
        else {
          throw new Error('You must be the authenticated');
        }
      } catch (err) {
        // 인증 실패 시 로직
      }
    };
  }
}
export default AuthDirective;